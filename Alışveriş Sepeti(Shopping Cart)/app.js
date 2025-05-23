const cartBtn = document.querySelector(".cart-btn");
const clearCartBtn = document.querySelector(".btn-clear");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".total-value");
const cartContent = document.querySelector(".cart-list");
const productsDom = document.querySelector("#product-dom");

const rooms = [
  { name: "Modern Minimal Oda", price: 2150,id:1 },
  { name: "İskandinav Yatak Odası", price: 1850, id:2 },
  { name: "Konforlu Oturma Alanı", price: 1950, id:3 },
  { name: "Lüks Gün Batımı Süiti", price: 3750, id:4 },
  { name: "Sanatsal Stüdyo", price: 1650, id:5 },
  { name: "Penthouse Salon", price: 4500, id: 6},
  { name: "Şık Retro Oda", price: 1550, id:7 },
  { name: "Aile Mutfak Köşesi", price: 1700, id:8 },
  { name: "Şehir Manzaralı Konfor Odası", price: 2250, id:9 },
  { name: "Çalışma ve Dinlenme Alanı", price: 1450, id:10 }
];

let cart=[];
let buttonsDom=[];

document.addEventListener("DOMContentLoaded", () => {
  const ui=new UI();
  const products = new Products();

  ui.setupApp();
  products.getProducts().then(products=>{
    ui.displayProducts(products);
    Storage.saveProducts(products)
  }).then(()=>{
    ui.getBagButtons();
    ui.cartLogic();
  })
});
