// Simulated inventory data
const inventory = {
  candy1: { name: "Candy 1", price: 1.99, image: "candy1.jpg", stock: 10 },
  candy2: { name: "Candy 2", price: 2.49, image: "candy2.jpg", stock: 5 },
  // Add more candies to the inventory
};

function searchCandy() {
  const candyNameInput = document.getElementById("candyName");
  const error = document.getElementById("error");
  const candyInfo = document.getElementById("candyInfo");
  const candyNameDisplay = document.getElementById("candyNameDisplay");
  const candyPriceDisplay = document.getElementById("candyPriceDisplay");
  const candyImage = document.getElementById("candyImage");
  const candyAmount = document.getElementById("candyAmount");
  const outOfStockMessage = document.getElementById("outOfStock");

  const name = candyNameInput.value;
  if (!name || !isNaN(name)) {
    error.textContent = "Please enter a valid candy name.";
    candyInfo.style.display = "none";
    return;
  }

  error.textContent = "";
  if (inventory[name]) {
    const candy = inventory[name];
    candyNameDisplay.textContent = "Name: " + candy.name;
    candyPriceDisplay.textContent = "Price: $" + candy.price.toFixed(2);
    candyImage.src = candy.image;

    if (candy.stock > 0) {
      outOfStockMessage.style.display = "none";
      candyInfo.style.display = "block";
    } else {
      outOfStockMessage.style.display = "block";
      candyInfo.style.display = "none";
    }
  } else {
    error.textContent = "Candy not found in inventory.";
    candyInfo.style.display = "none";
  }
}

function addToCart() {
  const candyNameDisplay = document.getElementById("candyNameDisplay");
  const candyPriceDisplay = document.getElementById("candyPriceDisplay");
  const candyAmount = document.getElementById("candyAmount");
  const cartItems = document.getElementById("cartItems");

  const name = candyNameDisplay.textContent.replace("Name: ", "");
  const price = parseFloat(
    candyPriceDisplay.textContent.replace("Price: $", "")
  );
  const amount = parseInt(candyAmount.value);

  if (amount > 0 && inventory[name] && inventory[name].stock >= amount) {
    // Add the item to the cart
    const li = document.createElement("li");
    li.textContent = `${name} x${amount} - $${(price * amount).toFixed(2)}`;
    cartItems.appendChild(li);

    // Update the inventory
    inventory[name].stock -= amount;
    searchCandy(); // Refresh the candy info

    // Reset input fields
    candyAmount.value = "";
  } else {
    alert("Invalid quantity or candy is out of stock.");
  }
}
