import { addtocart, cart, loadFromStorage } from "../../data/cart.js";

describe("test suite: addtocart", () => {
	it("adds an existing product to the cart", () => {
		spyOn(localStorage, "setItem");

		spyOn(localStorage, "getItem").and.callFake(() => {
			return JSON.stringify([
				{
					productID: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
					quantity: 1,
					deliveryOptionID: "1",
				},
			]);
		});
		loadFromStorage();
		addtocart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e", 1);
		expect(cart.length).toEqual(1);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(cart[0].productID).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
		expect(cart[0].quantity).toEqual(2);
	});

	it("adds a new product to the cart", () => {
		spyOn(localStorage, "setItem");

		spyOn(localStorage, "getItem").and.callFake(() => {
			return JSON.stringify([]);
		});
		loadFromStorage();

		addtocart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e", 1);
		expect(cart.length).toEqual(1);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(cart[0].productID).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
		expect(cart[0].quantity).toEqual(1);
	});
});
