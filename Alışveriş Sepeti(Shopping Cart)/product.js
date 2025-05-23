class Products {
  async getProducts() {
    try {
      let result = await fetch(
        "https://api.unsplash.com/search/photos?query=room&client_id=2TaEukJ6dqLN8RSgKPZLum1ZT7mW70R4J7qIEpXjnDU"
      );
      let data = await result.json();
      let products = data;
      for(let i=0; i<products["results"].length; i++){
        products["results"][i].detail=rooms[i];
      }
      return products["results"]
    } catch (error) {
      console.log(error);
    }
  }
}

class UI {

  //ürünleri sıralamak
  displayProducts(products) {
    let result = "";
    products.forEach((item) => {
      result += ` <div class="col-12 col-md-6 col-lg-4 room-item" >
                <div class="product">
                    <div class="product-image">
                        <img src="${item["urls"]["small"]}" alt="product">
                    </div>
                    <div class="product-hover">
                        <span class="product-title">${item["detail"]["name"]}</span>
                        <span class="product-price">${item["detail"]["price"].toLocaleString("tr-TR") + " ₺"}</span>
                        <button class="btn-add-to-cart" data-id=${item["detail"]["id"]}>
                            <i class="fas fa-cart-shopping"></i>
                        </button>
                    </div>
                </div>
            </div> `;
    });

    productsDom.innerHTML = result;
  }

  //button idlere göre yapılan işlemler
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".btn-add-to-cart")];
    buttonsDom = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.setAttribute("disabled", "disabled");
        button.opacity = ".3";
      } else {
        button.addEventListener("click", (event) => {
          const product = button.closest('.product')
          const productImage = product.querySelector('.product-image img').src;
          const productTitle = product.querySelector('.product-title').innerText;
          const productPrice = product.querySelector('.product-price').innerText;
          event.target.disabled = true;
          event.target.style.opacity = ".3";
          
          let carItem = { 
            id: id, 
            amount: 1, 
            img: productImage, 
            title: productTitle, 
            price:productPrice 
          };

          cart = [...cart, carItem];
          Storage.saveCart(cart);
          this.saveCartValues(cart);
          this.addCartItem(carItem);
          this.showCart();
        });
      }
    });
  }

  saveCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += Number(item.price.replace(/\./g, "").replace("₺", "")) * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = tempTotal.toLocaleString("tr-TR") + "₺";
    cartItems.innerText = itemsTotal;
  }

  addCartItem(item) {
    const li = document.createElement("li");
    li.classList.add("cart-list-item");
    li.innerHTML = `<div class="cart-left">
                        <div class="cart-left-image">
                            <img src="${item.img}" alt="product">
                        </div>
                        <div class="cart-left-info">
                            <a class="cart-left-info-title" href="#">${item.title}</a>
                            <span class="cart-left-info-price">${item.price}</span>
                        </div>
                    </div>
                    <div class="cart-right">
                        <div class="cart-right-quantity">
                            <button class="quantity-minus" data-id=${item.id}>
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity">${item.amount}</span>
                             <button class="quantity-plus"data-id=${item.id}>
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="cart-right-remove">
                            <button class="cart-remove-btn"data-id=${item.id}>
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>`;
    cartContent.appendChild(li);
  }

  //göstermek
  showCart() {
    cartBtn.click();
  }

  // cart'a kayıt edileni ekranda tutuyor
  setupApp() {
    cart = Storage.getCart();
    this.saveCartValues(cart);
    this.populateCart(cart);
  }

  // cart iteme atıyor
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }

  //silme işlemleri
  cartLogic() {
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
    });

    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("cart-remove-btn")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        removeItem.parentElement.parentElement.parentElement.remove();
        this.removeItem(id);
      } else if (event.target.classList.contains("quantity-minus")) {
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.saveCartValues(cart);
          lowerAmount.nextElementSibling.innerText = tempItem.amount;
        } else {
          lowerAmount.parentElement.parentElement.parentElement.remove();
          this.removeItem(id);
        }
      } else if (event.target.classList.contains("quantity-plus")) {
        let addAmonunt = event.target;
        let id = addAmonunt.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.saveCartValues(cart);
        addAmonunt.previousElementSibling.innerText = tempItem.amount;
      }
    });
  }

  //ui'dan siliyor
  clearCart() {
    let cartItems = cart.map((item) => item.id);
    cartItems.forEach((id) => this.removeItem(id));
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
  }

  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.saveCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSinleButton(id);
    button.disabled = false;
    button.style.opacity = "";
  }

  getSinleButton(id) {
    return buttonsDom.find((button) => button.dataset.id === id);
  }
}

class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}
