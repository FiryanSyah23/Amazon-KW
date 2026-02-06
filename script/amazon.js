// import { cart as myCart} from "../data/cart.js";
import { cart } from "../data/cart.js";
import { products } from "../data/products.js
let productListHTML = "";
products.forEach((product) => {
  productListHTML += `
        <div class="product-container">
            <div class="product-image-container">
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
                ${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
            <select>
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

const print_product_grid = document.querySelector(".js-product-grid");
print_product_grid.innerHTML = productListHTML;

const button_add_to_cart = document.querySelectorAll(".js-add-to-card");

button_add_to_cart.forEach((button) => {
  button.addEventListener("click", () => {
    const product_id = button.dataset.productId;

    // cari nilai id yang sama
    let matchingItem;
    cart.forEach((item) => {
      if (product_id === item.productId) {
        matchingItem = item;
      }
    });
    // kondisi jika sama id quantity bertambah 1
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      matchingItem = {
        productId: product_id,
        quantity: 1,
      };
      cart.push(matchingItem);
    }

    let totalCartQuantity = 0;

    cart.forEach((i) => {
      totalCartQuantity = i.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = totalCartQuantity;
  });
});
