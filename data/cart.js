//------------------------------------------
//  Tempat Simpan Object
//------------------------------------------

export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },
    {
      productID: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      quantity: 1,
    },
  ];
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
    };
    cart.push(matchingItem);
  }
  saveToStorage();
};

//------------------------------------------
// fungsi Menghapus objek pada cart array
//------------------------------------------
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

export function countingQuantity(className, spesialText) {
  let totalCartQuantity = 0;
  totalCartQuantity = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  localStorage.setItem("countProduct", JSON.stringify(totalCartQuantity));
  document.querySelector(`.${className}`).innerHTML = JSON.parse(localStorage.getItem("countProduct")) + spesialText;
}
