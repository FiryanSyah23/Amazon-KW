import { renderOrderSummary } from "./CheckOut/orderSummary.js";
import { renderPaymentSummary } from "./CheckOut/paymentSummary.js";
import { loadProduct } from "../data/products.js";
// import "../data/cart-oop.js";
// import "../data/backend-practice.js";

loadProduct(() => {
	renderOrderSummary();
	renderPaymentSummary();
});
