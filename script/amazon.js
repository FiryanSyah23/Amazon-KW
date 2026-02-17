// import { cart as myCart} from "../data/cart.js";
import { countingQuantity, addtocart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

function orderAmazonPage() {
  let productListHTML = "";
  products.forEach((product) => {
    productListHTML += `
          <div class="product-container">
              <div class="producd-image-container">
              <img class="product-image" src="${product.image}">
              </div>
  
              <div class="product-name limit-text-to-2-lines">
              ${product.name}
              </div>
  
              <div class="product-rating-container">
              <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                  ${product.rating.count}
              </div>
              </div>
  
              <div class="product-price">
                  $${formatCurrency(product.priceCents)}
              </div>
  
              <div class="product-quantity-container">
              <select class="js-product-quantity-container">
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
              </select>
              </div>
              <div class="product-spacer"></div>
              <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
              </div>
              <button class="add-to-cart-button button-primary js-add-to-card" data-product-id="${product.id}">
              Add to Cart
              </button>
          </div>
      `;
  });
  document.querySelector(".js-product-grid").innerHTML = productListHTML;

  //-------------------------------------
  //     fungsi hitung jumlah barang
  //-------------------------------------

  document.querySelectorAll(".js-add-to-card").forEach((button) => {
    button.addEventListener("click", () => {
      const addValueID = button.dataset.productId;
      const header = button.closest(".product-container");
      const select = header.querySelector(".js-product-quantity-container");
      const quantity = Number(select.value);

      addtocart(addValueID, quantity);
      countingQuantity("js-cart-quantity", null);
      orderAmazonPage();
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    let productQuantity = JSON.parse(localStorage.getItem("countProduct"));
    productQuantity === 0 ? "" : countingQuantity("js-cart-quantity", null);
  });
}

orderAmazonPage();
