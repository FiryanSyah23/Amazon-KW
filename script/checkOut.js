import { renderOrderSummary } from "./CheckOut/orderSummary.js";
import { renderPaymentSummary } from "./CheckOut/paymentSummary.js";
import { loadProductFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-oop.js";
// import "../data/backend-practice.js";

async function loadPage() {
	console.log("load page");
	try {
		// throw new Error("erro1");

		await loadProductFetch();
		await new Promise((resolve) => {
			// throw "error2";
			loadCart(() => {
				// reject("error3");
				resolve(); // checkup for complete callback
			});
		});
	} catch (error) {
		console.log("Unexpected Error. Pleas Try Again Later");
	}

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
