// window.addEventListener("beforeunload", () => {
//   localStorage.clear();
// });

function loadCartItems() {
  const cartData = localStorage.getItem("cart") || "";
  const cartItemsTable = document.getElementById("cart-items");
  let total = 0;

  // Clear the existing rows in the table
  cartItemsTable.innerHTML = "";

  const cartItems = cartData.split("|");
  console.log(cartItems);
  if (cartItems[0] === "") {
    // If there are no items in the cart, display a message
    const emptyCartRow = document.createElement("tr");
    const emptyCartCell = document.createElement("td");
    emptyCartCell.colSpan = 4; // Span across all columns
    emptyCartCell.textContent = "Cart is empty";
    emptyCartRow.appendChild(emptyCartCell);
    cartItemsTable.appendChild(emptyCartRow);
  } else {
    cartItems.forEach((itemData) => {
      const [productId, name, quantity, price] = itemData.split(":");

      const row = document.createElement("tr");
      const productNameCell = document.createElement("td");
      const quantityCell = document.createElement("td");
      const priceCell = document.createElement("td");
      const totalItemPriceCell = document.createElement("td");

      productNameCell.textContent = name;
      quantityCell.textContent = quantity;
      priceCell.textContent = `$${parseFloat(price).toFixed(2)}`;
      totalItemPriceCell.textContent = `$${(
        parseFloat(price) * parseInt(quantity)
      ).toFixed(2)}`;

      row.appendChild(productNameCell);
      row.appendChild(quantityCell);
      row.appendChild(priceCell);
      row.appendChild(totalItemPriceCell);
      cartItemsTable.appendChild(row);

      // Calculate and update the total price
      total += parseFloat(price) * parseInt(quantity);
    });
  }

  // Update the total price on the page
  const cartTotal = document.getElementById("cart-total");
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Call the loadCartItems function when the cart page loads
loadCartItems();
