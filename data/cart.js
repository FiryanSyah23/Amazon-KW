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
export const addtocart = (product_id) => {
  // cari nilai id yang sama
  let matchingItem;
  cart.forEach((cartItem) => {
    if (product_id === cartItem.productID) {
      matchingItem = cartItem;
    }
  });
  // kondisi jika sama id quantity bertambah 1
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    matchingItem = {
      productID: product_id,
      quantity: 1,
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
