import { cart, refrehUpdatedelivery } from "../../data/cart.js";
import { getProductID, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOption, getIDDelivery } from "../../data/deliveryOption.js";

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

	paymentSummary += `
        <div class="payment-summary-title">
            Order Summary
        </div>
        
        <div class="payment-summary-row">
            <div class="js-counting-quantity"> :</div>
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
        
        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;

	document.querySelector(".js-payment-summary").innerHTML = paymentSummary;
}
