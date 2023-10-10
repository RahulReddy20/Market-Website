// window.addEventListener("beforeunload", () => {
//   localStorage.clear();
// });
// if (!localStorage.getItem("cart")) {
//   localStorage.setItem("cart", JSON.stringify([]));
//   console.log("local storage created");
// }

// function addToCart(productId) {
//   console.log("Clicked" + productId);
//   const product = products.find((product) => product.id === productId);

//   if (product && product.inventory > 0) {
//     // Check if the product is already in the cart
//     const cart = JSON.parse(localStorage.getItem("cart"));
//     const cartItem = cart.find((item) => item.id === productId);
//     console.log(cartItem);
//     if (cartItem) {
//       // Increment the quantity if the product is already in the cart
//       cartItem.quantity++;
//     } else {
//       // Add the product to the cart with quantity 1 if it's not already in the cart
//       cart.push({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         quantity: 1,
//       });
//     }

//     // Update the cart in local storage
//     localStorage.setItem("cart", JSON.stringify(cart));

//     // Decrement the product inventory
//     product.inventory--;
//     document.getElementById(productId).innerHTML =
//       "Inventory: " + product.inventory;

//     // Update the product inventory in local storage
//     updateAllInventory();
//   } else {
//     alert("This item is out of stock.");
//   }
// }

// function updateAllInventory() {
//   localStorage.setItem("productInventory", JSON.stringify(products));
//   // localStorage.setItem("FrozenProductInventory", JSON.stringify(products));
// }

function loadCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsTable = document.getElementById("cart-items");
  let total = 0;

  // Clear the existing rows in the table
  cartItemsTable.innerHTML = "";

  cart.forEach((item) => {
    const row = document.createElement("tr");
    const productNameCell = document.createElement("td");
    const priceCell = document.createElement("td");
    const quantityCell = document.createElement("td");
    const totalItemPriceCell = document.createElement("td");

    productNameCell.textContent = item.name;
    priceCell.textContent = `$${item.price.toFixed(2)}`;
    quantityCell.textContent = item.quantity;
    totalItemPriceCell.textContent = `$${item.price * item.quantity}`;

    row.appendChild(productNameCell);

    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(totalItemPriceCell);
    cartItemsTable.appendChild(row);

    // Calculate and update the total price
    total += item.price * item.quantity;
  });

  // Update the total price on the page
  const cartTotal = document.getElementById("cart-total");
  cartTotal.textContent = total.toFixed(2);
}

// Call the loadCartItems function when the cart page loads
loadCartItems();

// const cartItemsContainer = document.querySelector(".cart-items");

// function displayCart() {
//   const cart = getCartFromLocalStorage();

//   cartItemsContainer.innerHTML = "";

//   if (cart.length === 0) {
//     cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
//   } else {
//     cart.forEach((item) => {
//       const cartItem = document.createElement("div");
//       cartItem.classList.add("cart-item");

//       cartItem.innerHTML = `
//                 <span>${item.name}</span>
//                 <input type="number" class="item-quantity" value="${
//                   item.quantity
//                 }" min="1">
//                 <span>$${item.price.toFixed(2)}</span>
//                 <button class="remove-item">Remove</button>
//             `;

//       cartItemsContainer.appendChild(cartItem);

//       const quantityInput = cartItem.querySelector(".item-quantity");
//       const removeButton = cartItem.querySelector(".remove-item");

//       quantityInput.addEventListener("input", (e) => {
//         const newQuantity = parseInt(e.target.value);
//         updateCartItemQuantity(item.name, newQuantity);
//       });

//       removeButton.addEventListener("click", () => {
//         removeItemFromCart(item.name);
//       });
//     });
//   }
// }

// function getCartFromLocalStorage() {
//   const storedCart = localStorage.getItem("cart");
//   return storedCart ? JSON.parse(storedCart) : [];
// }

// function updateCartItemQuantity(itemName, newQuantity) {
//   let cart = getCartFromLocalStorage();

//   cart = cart.map((item) => {
//     if (item.name === itemName) {
//       item.quantity = newQuantity;
//     }
//     return item;
//   });

//   localStorage.setItem("cart", JSON.stringify(cart));
//   displayCart();
// }

// function removeItemFromCart(itemName) {
//   let cart = getCartFromLocalStorage();

//   cart = cart.filter((item) => item.name !== itemName);

//   localStorage.setItem("cart", JSON.stringify(cart));
//   displayCart();
// }

// displayCart();
