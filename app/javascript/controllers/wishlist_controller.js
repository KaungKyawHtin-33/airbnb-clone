import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  updateWishlistStatus() {
    let loggedIn = this.element.dataset.userLoggedIn
    
    if (loggedIn === "false") {
      document.querySelector(".js-login").click()
      return false
    }

    if (this.element.dataset.status === "false") {
      let propertyId = this.element.dataset.propertyId
      let userId = this.element.dataset.userId
      this.addPropertyToWishlist(propertyId, userId)
    } else {
      let wishlistId = this.element.dataset.wishlistId
      this.removePropertyFromWishlist(wishlistId)
    }
  }

  addPropertyToWishlist(propertyId, userId) {
    const params = {
      property_id: propertyId,
      user_id: userId
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }

    fetch("/api/wishlist", options)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok!");
        }
        return response.json
      })
      .then(data => {
        console.log(data)
        this.element.dataset.wishlistId = data.id
        this.element.classList.remove("fill-none")
        this.element.classList.add("fill-primary")
        this.element.dataset.status = "true"
      })
      .catch(err => {
        console.error("Error found at adding wishlist => ", err)
      }) 
  }

  removePropertyFromWishlist(wishlistId) {
    fetch(`/api/wishlist/${wishlistId}`, { method: "DELETE" })
      .then(() => {
        this.element.dataset.wishlistId = ""
        this.element.classList.remove("fill-primary")
        this.element.classList.add("fill-none")
        this.element.dataset.status = "false"
      })
      .catch(err => {
        console.error("Error found at deleting wishlist => ", err)
      })
  }
}
