//------------------------------------------
//  Tempat Simpan Object CART
//------------------------------------------
export let cart;
loadFromStorage();
export function loadFromStorage() {
	cart = JSON.parse(localStorage.getItem("cart"));
	if (!cart) {
		cart = [
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

function saveToStorage() {
	localStorage.setItem("cart", JSON.stringify(cart));
}

//------------------------------------------
// fungsi menabahkan objek pada cart array
//------------------------------------------
export const addtocart = (product_id, quantity) => {
	let matchingItem;
	cart.forEach((cartItem) => {
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
		cart.push(matchingItem);
	}
	saveToStorage();
};

//------------------------------------------
// fungsi Menghapus objek pada cart array
//-----------------------------------------
export const removeFromCart = (cardIDProduct) => {
	const newCart = [];
	cart.forEach((cartItem) => {
		if (cartItem.productID !== cardIDProduct) {
			newCart.push(cartItem);
		}
	});

	cart = newCart;
	saveToStorage();
};

//------------------------------------------------
// fungsi Refres Page ChekcOut Barang interactive
//------------------------------------------------
export function refrehUpdatedelivery(product_id, deliveryOptionID) {
	const matchingItem1 = cart.find((item) => item.productID === product_id);
	if (!matchingItem1) {
		console.error("Product tidak ditemukan:", product_id);
		return;
	}
	matchingItem1.deliveryOptionID = deliveryOptionID;
	saveToStorage();
}

//------------------------------------------
// fungsi Menghitung barang pada checkout
//------------------------------------------
export function countingQuantity() {
	let totalCartQuantity = 0;
	totalCartQuantity = cart.reduce((total, item) => {
		return total + item.quantity;
	}, 0);

	localStorage.setItem("countProduct", JSON.stringify(totalCartQuantity));
	return totalCartQuantity;
}

//---------------------------------------------
// fungsi edit nilai dari quantity sebelumnya
//---------------------------------------------
export function changeStockQuantity(buttonUpdate) {
	const productId = buttonUpdate.dataset.quantityUpdate;
	const container = document.querySelector(`.js-cart-item-container-${productId}`);
	let input = container.querySelector(".input-update");
	const numberQuantity = container.querySelector(".quantity-label");
	// MODE UPDATE → BUAT INPUT
	if (buttonUpdate.textContent.trim() === "Update") {
		buttonUpdate.textContent = "Save";
		const item = cart.find((item) => item.productID === productId);

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
		cart.forEach((item) => {
			if (item.productID == productId) {
				item.quantity = nilaiInput;
			}
		});

		saveToStorage();
		container.querySelector(".quantity-label").textContent = nilaiInput;
		input.remove();
		buttonUpdate.textContent = "Update";
		numberQuantity.style.display = "inline";
	}
}
