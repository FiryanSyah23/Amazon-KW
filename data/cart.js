export const cart = [];

//------------------------------------------
// fungsi menabahkan objek pada cart array
//------------------------------------------
export const addtocart = (product_id) => {
  // cari nilai id yang sama
  let matchingItem;
  cart.forEach((cartItem) => {
    if (product_id === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  // kondisi jika sama id quantity bertambah 1
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    matchingItem = {
      productId: product_id,
      quantity: 1,
    };
    cart.push(matchingItem);
  }
};

