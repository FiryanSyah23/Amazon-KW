import { renderOrderSummary } from "./CheckOut/orderSummary.js";
import { renderPaymentSummary } from "./CheckOut/paymentSummary.js";
import { loadProductFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-oop.js";
// import "../data/backend-practice.js";

async function loadPage() {
	console.log("load page");
	await loadProductFetch();
	await new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	});
	
	renderPaymentSummary();
	renderOrderSummary();
	console.log("load render");
}
loadPage();

// Promise.all([
// 	loadProductFetch(renderOrderSummary),
// new Promise((resolve) => {
// 	loadCart(() => {
// 		resolve();
// 	});
// }),
// ]).then((values) => {
// 	console.log(values);
// renderPaymentSummary();
// renderOrderSummary();
// });

// Kalau cuma satu fetch
// loadProductFetch().then(() => {
//     renderPaymentSummary();
//     renderOrderSummary();
// });
