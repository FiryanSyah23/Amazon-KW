import { cart, countingQuantity } from "../../data/cart.js";
import { getProductID } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getIDDelivery } from "../../data/deliveryOption.js";
import { addOrders } from "../../data/orders.js";

export function renderPaymentSummary() {
	let paymentSummary = "";
	const priceTotal = cart.reduce((total, item) => {
		const product = getProductID(item.productID);
		return total + product.priceCents * item.quantity;
	}, 0);

	const shipingPricecent = cart.reduce((akumulator, item) => {
		const calldeliveryOption = getIDDelivery(item.deliveryOptionID);
		return akumulator + calldeliveryOption.costDelivery;
	}, 0);

	const totalBeforeTax = priceTotal + shipingPricecent;
	const taxCent = totalBeforeTax * 0.1;
	const totalProduct = totalBeforeTax + taxCent;

	const total = countingQuantity();

	paymentSummary += `
        <div class="payment-summary-title">
            Order Summary
        </div>
        
        <div class="payment-summary-row">
            <div class="js-counting-quantity">Items (${total}) :</div>
            <div class="payment-summary-money">$${formatCurrency(priceTotal)}</div>
        </div>
        
        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shipingPricecent)}</div>
        </div>
        
        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
        </div>
        
        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(taxCent)}</div>
        </div>
        
        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalProduct)}</div>
        </div>
        
        <button class="place-order-button button-primary js-place-order">
            Place your order
        </button>
    `;

	const paymentSummaryElement = document.querySelector(".js-payment-summary");
	if (paymentSummaryElement) {
		paymentSummaryElement.innerHTML = paymentSummary;
	}

	document.querySelector(".js-place-order").addEventListener("click", async () => {
		try {
			const cartForServer = cart.map((item) => ({
				productId: item.productID,
				quantity: item.quantity,
				deliveryOptionId: item.deliveryOptionID,
			}));

			const response = await fetch("https://supersimplebackend.dev/orders", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ cart: cartForServer }),
			});

			const order = await response.json();
			/**
			 * buat tambah object baru ke server 
				const orderWithDelivery = {
					...order,
					products: order.products.map((product) => {
						const cartItem = cart.find((item) => item.productID === product.productId);
						return {
							...product,
							deliveryOptionId: cartItem ? cartItem.deliveryOptionID : null,
						};
					}),
				};
			 */
			addOrders(order); // ✅
			window.location.href = "orders.html";
		} catch (error) {
			console.log("unexpect error, try again leter");
		}

	});
}
