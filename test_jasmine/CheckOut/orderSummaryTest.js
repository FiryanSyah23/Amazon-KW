import { renderOrderSummary } from "../../script/CheckOut/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProduct } from "../../data/products.js";

describe("Test suite: OrderSummary", () => {
	beforeAll((done) => {
		loadProduct(() => {
			done();
		});
	});

	beforeEach(() => {
		// ✅ Setup HTML dengan SEMUA element yang dibutuhkan
		document.querySelector(".js-test-container").innerHTML = `
				<div class="js-order-summary"></div>
				<div class="js-payment-summary"></div>
		`;
	});

	it("display the cart", () => {
		const productid1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
		const productid2 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
		spyOn(localStorage, "getItem").and.callFake(() => {
			return JSON.stringify([
				{
					productID: productid1,
					quantity: 2,
					deliveryOptionID: "1",
				},
				{
					productID: productid2,
					quantity: 1,
					deliveryOptionID: "2",
				},
			]);
		});

		loadFromStorage();
		renderOrderSummary();

		expect(document.querySelectorAll(".js-cart-container").length).toEqual(2);
		expect(document.querySelector(`.js-product-quantity-${productid1}`).innerText).toContain(`Quantity: 2`);
		expect(document.querySelector(`.js-product-quantity-${productid2}`).innerText).toContain(`Quantity: 1`);
	});

	it("remove a product", () => {
		spyOn(localStorage, "setItem");
		const productid1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
		const productid2 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
		spyOn(localStorage, "getItem").and.callFake(() => {
			return JSON.stringify([
				{
					productID: productid1,
					quantity: 2,
					deliveryOptionID: "1",
				},
				{
					productID: productid2,
					quantity: 1,
					deliveryOptionID: "2",
				},
			]);
		});
		loadFromStorage();
		renderOrderSummary();
		const deleteLink = document.querySelector(`.js-delete-link-${productid1}`);
		deleteLink.click();

		expect(document.querySelectorAll(".js-cart-container").length).toEqual(1);
		expect(document.querySelector(`.js-cart-item-container-${productid1}`)).toEqual(null); // ✅ sudah dihapus
		expect(document.querySelector(`.js-cart-item-container-${productid2}`)).not.toEqual(null); // ✅ masih ada
		expect(cart.length).toEqual(1);
		expect(cart[0].productID).toEqual(productid2); // ✅ satu-satunya item yang tersisa
	});
});
