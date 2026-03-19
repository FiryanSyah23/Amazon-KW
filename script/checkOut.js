import { renderOrderSummary } from "./CheckOut/orderSummary.js";
import { renderPaymentSummary } from "./CheckOut/paymentSummary.js";
import { loadProductFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-oop.js";
// import "../data/backend-practice.js";

Promise.all([
	loadProductFetch(),
	new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	}),
]).then((values) => {
	console.log(values);
	renderOrderSummary();
	renderPaymentSummary();
});
