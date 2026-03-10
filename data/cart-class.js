//------------------------------------------
//  Tempat Simpan Object CART
//------------------------------------------
class Cart {
	cartItem;
	#localStorageKey;

	constructor(localStorageKey) {
		this.#localStorageKey = localStorageKey;
		this.#loadFromStorage();
	}

	#loadFromStorage() {
		this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey));
		if (!this.cartItem) {
			this.cartItem = [
				{
					productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
					quantity: 2,
					deliveryOptionID: "1",
				},
				{
					productID: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
					quantity: 1,
					deliveryOptionID: "2",
				},
			];
		}
	}

	saveToStorage() {
		localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem));
	}

	//------------------------------------------
	// fungsi menabahkan objek pada cart array
	//------------------------------------------
	addtocart(product_id, quantity) {
		let matchingItem;
		this.cartItem.forEach((cartItem) => {
			if (product_id === cartItem.productID) {
				matchingItem = cartItem;
			}
		});
		if (matchingItem) {
			matchingItem.quantity += quantity;
		} else {
			matchingItem = {
				productID: product_id,
				quantity: quantity,
				deliveryOptionID: "1",
			};
			this.cartItem.push(matchingItem);
		}
		this.saveToStorage();
	}

	//------------------------------------------
	// fungsi Menghapus objek pada cart array
	//-----------------------------------------
	removeFromCart(cardIDProduct) {
		const newCart = [];
		this.cartItem.forEach((cartItem) => {
			if (cartItem.productID !== cardIDProduct) {
				newCart.push(cartItem);
			}
		});

		this.cartItem = newCart;
		this.saveToStorage();
	}

	//------------------------------------------------
	// fungsi Refres Page ChekcOut Barang interactive
	//------------------------------------------------
	refrehUpdatedelivery(product_id, deliveryOptionID) {
		const matchingItem1 = this.cartItem.find((item) => item.productID === product_id);
		if (!matchingItem1) {
			console.error("Product tidak ditemukan:", product_id);
			return;
		}
		matchingItem1.deliveryOptionID = deliveryOptionID;
		this.saveToStorage();
	}

	//------------------------------------------
	// fungsi Menghitung barang pada checkout
	//------------------------------------------
	countingQuantity() {
		let totalCartQuantity = 0;
		totalCartQuantity = this.cartItem.reduce((total, item) => {
			return total + item.quantity;
		}, 0);

		localStorage.setItem("countProduct", JSON.stringify(totalCartQuantity));
		return totalCartQuantity;
	}

	//---------------------------------------------
	// fungsi edit nilai dari quantity sebelumnya
	//---------------------------------------------
	changeStockQuantity(buttonUpdate) {
		const productId = buttonUpdate.dataset.quantityUpdate;
		const container = document.querySelector(`.js-cart-item-container-${productId}`);
		let input = container.querySelector(".input-update");
		const numberQuantity = container.querySelector(".quantity-label");
		// MODE UPDATE → BUAT INPUT
		if (buttonUpdate.textContent.trim() === "Update") {
			buttonUpdate.textContent = "Save";
			const item = this.cartItem.find((item) => item.productID === productId);

			if (item && !input) {
				buttonUpdate.insertAdjacentHTML("beforebegin", `<input type="number" min="1" class="input-update" value="${item.quantity}">`);
				input = container.querySelector(".input-update");
				input.addEventListener("keydown", (e) => {
					if (e.key === "Enter") {
						buttonUpdate.click();
					}
				});
				input.focus();
				numberQuantity.style.display = "none";
			}
		} else {
			const nilaiInput = Number(input.value);
			this.cartItem.forEach((item) => {
				if (item.productID == productId) {
					item.quantity = nilaiInput;
				}
			});

			this.saveToStorage();
			container.querySelector(".quantity-label").textContent = nilaiInput;
			input.remove();
			buttonUpdate.textContent = "Update";
			numberQuantity.style.display = "inline";
		}
	}
}

const cart = new Cart("cart-oop");
const cartBusiness = new Cart("cart-oop-business");

console.log(cart, cartBusiness);
