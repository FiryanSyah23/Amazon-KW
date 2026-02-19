import { changeStockQuantity, countingQuantity, cart, removeFromCart, refrehUpdatedelivery } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOption } from "../../data/deliveryOption.js";
import dayjs from "https://unpkg.com/dayjs@1.11.19/esm/index.js";
import localeID from "https://unpkg.com/dayjs@1.11.19/esm/locale/id.js";

//------------------------------------------
//     fungsi panggil page CheckOut
//------------------------------------------
export function renderOrderSummary() {
	dayjs.locale(localeID);

	let cartSummaryHTML = "";
	cart.forEach((cartItem) => {
		const callproductid = cartItem.productID;
		let matchingProduct;
		let calldeliveryOption;
		const takedeliveryID = cartItem.deliveryOptionID;

		products.forEach((productItem) => {
			if (productItem.id === callproductid) {
				matchingProduct = productItem;
			}
		});

		deliveryOption.forEach((option) => {
			if (option.idDelivery === takedeliveryID) {
				calldeliveryOption = option;
			}
		});

		const today = dayjs();
		const deliveryDate = today.add(calldeliveryOption.deliveryDays, "days");
		const dateString = deliveryDate.format("dddd, D MMMM");

		cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                Delivery date: ${dateString}
                </div>
    
                <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}">
    
                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-button-update" data-quantity-update="${matchingProduct.id}">Update</span>
                    <span class="delete-quantity-link link-primary js-delete-quantity-link" data-id-checkout="${matchingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>
    
                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    ${deliveryOptionHTML(matchingProduct, cartItem)}
                </div>
                </div>
            </div>
        `;
	});
	document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

	function deliveryOptionHTML(matchingProduct, cartItem) {
		let deliveryOptionSummary = "";
		deliveryOption.forEach((deliveryItem) => {
			const today = dayjs();
			const deliveryDate = today.add(deliveryItem.deliveryDays, "days");
			const dateString = deliveryDate.format("dddd, D MMMM");

			const priceString = deliveryItem.costDelivery === 0 ? "FREE" : `$${formatCurrency(deliveryItem.costDelivery)} -`;
			const isChecked = deliveryItem.idDelivery === cartItem.deliveryOptionID;

			deliveryOptionSummary += `
                <div class="delivery-option js-delivery-option" data-product-id="${cartItem.productID}" data-delivery-option-id="${deliveryItem.idDelivery}">
                    <input ${isChecked ? "checked" : ""} type="radio" class="delivery-option-input" 
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                    </div>
                </div>
            `;
		});

		return deliveryOptionSummary;
	}

	//------------------------------------------
	//        Single Event Listener
	//------------------------------------------
	document.addEventListener("click", (event) => {
		// Hapus Produk Checkout
		const deleteBtn = event.target.closest(".js-delete-quantity-link");
		if (deleteBtn) {
			const productCheckOut = deleteBtn.dataset.idCheckout;
			removeFromCart(productCheckOut);
			document.querySelector(`.js-cart-item-container-${productCheckOut}`)?.remove();
			updateTotalItems();
			return;
		}

		// Update Quantity
		const updateBtn = event.target.closest(".js-button-update");
		if (updateBtn) {
			changeStockQuantity(updateBtn);
			updateTotalItems();
			return;
		}

		// Update Delivery
		const deliveryOption = event.target.closest(".js-delivery-option");
		if (deliveryOption) {
			const productID = deliveryOption.dataset.productId;
			const deliveryOptionID = deliveryOption.dataset.deliveryOptionId;

			refrehUpdatedelivery(productID, deliveryOptionID);
			renderOrderSummary();
			return;
		}
	});

	//        Event Saat Page Load
	document.addEventListener("DOMContentLoaded", () => {
		updateTotalItems();
	});

	//        Function Update Total Item
	function updateTotalItems() {
		const total = countingQuantity();
		document.querySelector(".js-counting-quantity").innerHTML = `Items (${total})`;
		document.querySelector(".js-count-item").innerHTML = total + " items";
	}
}
