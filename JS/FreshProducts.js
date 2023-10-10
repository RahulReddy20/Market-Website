// window.addEventListener("beforeunload", () => {
//   localStorage.clear();
// });

const products = [
  {
    id: 1,
    name: "Broccoli",
    category: "all-vegetables",
    imageSrc: "../Assets/freshpoducts/broccoli.jpg",
    price: 1.99,
    inventory: 10,
  },
  {
    id: 2,
    name: "Potatoes",
    category: "all-vegetables",
    imageSrc: "../Assets/freshpoducts/potatoes.jpg",
    price: 0.69,
    inventory: 15,
  },
  {
    id: 3,
    name: "Red Chillies",
    category: "salsa-and-dips",
    imageSrc: "../Assets/freshpoducts/redchillies.jpg",
    price: 5.49,
    inventory: 5,
  },
  {
    id: 4,
    name: "Red Chillies",
    category: "salsa-and-dips",
    imageSrc: "../Assets/freshpoducts/redchillies.jpg",
    price: 5.49,
    inventory: 5,
  },
  {
    id: 5,
    name: "Red Chillies",
    category: "salsa-and-dips",
    imageSrc: "../Assets/freshpoducts/redchillies.jpg",
    price: 5.49,
    inventory: 5,
  },
  // Add more products here...
];

function generateProductCards(category) {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";

  products.forEach((product) => {
    if (category === "shop-all" || product.category === category) {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
                        <div class="card-img">
                            <img class="item-img" src="${
                              product.imageSrc
                            }" alt="${product.name}">
                        </div>
                        <div class="card-content">
                            <h2 class="item-heading">${product.name}</h2>
                            <p class="item-content"></p>
                            <p class="price">$${product.price.toFixed(
                              2
                            )} / lb</p>
                            <button class="button-style" onclick="addToCart(${
                              product.id
                            })">Add to Cart</button>
                        </div>
                    `;

      cardContainer.appendChild(card);
    }
  });
}

// const cart = [];
function initializeProductInventory() {
  const storedInventory = localStorage.getItem("productInventory");

  if (!storedInventory) {
    localStorage.setItem("productInventory", JSON.stringify(products));
  } else {
    const parsedInventory = JSON.parse(storedInventory);
    products.forEach((product) => {
      const storedProduct = parsedInventory.find(
        (item) => item.id === product.id
      );
      if (storedProduct) {
        product.inventory = storedProduct.inventory;
      }
    });
  }
}
initializeProductInventory();

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
  console.log("local storage created");
}

function addToCart(productId) {
  console.log("Clicked" + productId);
  const product = products.find((product) => product.id === productId);

  if (product && product.inventory > 0) {
    // Check if the product is already in the cart
    const cart = JSON.parse(localStorage.getItem("cart"));
    const cartItem = cart.find((item) => item.id === productId);
    console.log(cartItem);
    if (cartItem) {
      // Increment the quantity if the product is already in the cart
      cartItem.quantity++;
    } else {
      // Add the product to the cart with quantity 1 if it's not already in the cart
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    // Update the cart in local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Decrement the product inventory
    product.inventory--;
    document.getElementById(productId).innerHTML =
      "Inventory: " + product.inventory;

    // Update the product inventory in local storage
    updateAllInventory();
  } else {
    alert("This item is out of stock.");
  }
}

function updateAllInventory() {
  localStorage.setItem("productInventory", JSON.stringify(products));
  // localStorage.setItem("FrozenProductInventory", JSON.stringify(products));
}
// function addToCart(name, price) {
//   const product = products.find((p) => p.name === name);

//   if (product && product.inventory > 0) {
//     cart.push({ name, price });
//     product.inventory--;
//     displayCart();
//   } else {
//     alert("This item is out of stock.");
//   }
// }

// FreshProducts.js
// FreshProducts.js
// function addToCart(name, price) {
//   const product = products.find((p) => p.name === name);

//   if (product && product.inventory > 0) {
//     cart.push({ name, price });
//     product.inventory--;
//     saveCartToLocalStorage(); // Save the cart to Local Storage
//     displayCart();
//   } else {
//     alert("This item is out of stock.");
//   }
// }

// function saveCartToLocalStorage() {
//   localStorage.setItem("cart", JSON.stringify(cart));
// }

// function getCartFromLocalStorage() {
//   const storedCart = localStorage.getItem("cart");
//   return storedCart ? JSON.parse(storedCart) : [];
// }

// function displayCart() {
//   const cartItemsContainer = document.querySelector(".cart-items");
//   cartItemsContainer.innerHTML = "<p>Empty</p>";

//   if (cart.length === 0) {
//     cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
//   } else {
//     cart.forEach((item) => {
//       const cartItem = document.createElement("div");
//       cartItem.classList.add("cart-item");

//       cartItem.innerHTML = `
//                         <span>${item.name}</span>
//                         <span>$${item.price.toFixed(2)}</span>
//                     `;

//       cartItemsContainer.appendChild(cartItem);
//     });
//   }
// }
function onCategoryChange() {
  const categoryDropdown = document.getElementById("category-dropdown");
  const selectedCategory = categoryDropdown.value;
  generateProductCards(selectedCategory);
}
// document.getElementById("myLink").onclick = function goToCart(e) {
//   e.preventDefault();
//   window.location.href = "Cart.html";
//   console.log("runing");
// };

generateProductCards("shop-all");
