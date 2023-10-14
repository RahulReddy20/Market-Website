// window.addEventListener("beforeunload", () => {
//   localStorage.clear();
// });

const products = [
  {
    id: 29,
    name: "Green Beans",
    category: "canned-vegetables",
    price: 1.99,
    inventory: 23,
  },
  {
    id: 30,
    name: "Mixed Vegetables",
    category: "canned-vegetables",
    price: 2.49,
    inventory: 12,
  },
  {
    id: 31,
    name: "Chicken Broth",
    category: "canned-goods",
    price: 1.29,
    inventory: 19,
  },
  {
    id: 32,
    name: "Baked Beans",
    category: "canned-goods",
    price: 2.69,
    inventory: 18,
  },
  {
    id: 33,
    name: "Tuna",
    category: "canned-goods",
    price: 3.29,
    inventory: 7,
  },
  {
    id: 34,
    name: "Tomato Sauce",
    category: "canned-goods",
    price: 0.99,
    inventory: 13,
  },
  {
    id: 35,
    name: "Chilli sauce",
    category: "condiments",
    price: 2.49,
    inventory: 16,
  },
  {
    id: 36,
    name: "Creamy Siracha",
    category: "condiments",
    price: 2.99,
    inventory: 12,
  },
  {
    id: 37,
    name: "Tomato Ketchup",
    category: "condiments",
    price: 3.99,
    inventory: 14,
  },
  {
    id: 38,
    name: "Peanut Butter",
    category: "peanut-butter-spread",
    price: 2.99,
    inventory: 8,
  },
  {
    id: 39,
    name: "Jalapeno Spread",
    category: "peanut-butter-spread",
    price: 3.69,
    inventory: 17,
  },
  {
    id: 40,
    name: "Pasta",
    category: "pasta-pizza",
    price: 2.99,
    inventory: 24,
  },
  {
    id: 41,
    name: "Noodles",
    category: "pasta-pizza",
    price: 3.99,
    inventory: 15,
  },
  {
    id: 42,
    name: "Veg Supreme Pizza",
    category: "pasta-pizza",
    price: 6.99,
    inventory: 7,
  },
  {
    id: 43,
    name: "Rice",
    category: "rollbacks",
    price: 7.99,
    inventory: 18,
  },
  {
    id: 44,
    name: "Flour",
    category: "rollbacks",
    price: 4.99,
    inventory: 8,
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

      const imageSrc = `../Assets/pantry/${product.name.toLowerCase()}.jpeg`;

      card.innerHTML = `
                        <div class="card-img">
                            <img class="item-img" src="${imageSrc}" alt="${
        product.name
      }">
                        </div>
                        <div class="card-content">
                            <h2 class="item-heading">${product.name}</h2>
                            <p class="item-content"></p>
                            <p class="price">$${product.price.toFixed(2)}</p>
                            <button class="button-style" onclick="addToCart(${
                              product.id
                            })">Add to Cart</button>
                        </div>
                    `;

      cardContainer.appendChild(card);
    }
  });
}

function initializeFrozenProductInventory() {
  const storedInventory = localStorage.getItem("pantryproductInventory");

  if (!storedInventory) {
    // Initialize the product inventory in localStorage
    const productData = products
      .map((product) => {
        return `${product.id},${product.name},${product.category},${product.imageSrc},${product.price},${product.inventory}`;
      })
      .join("|"); // Use a delimiter to separate the product data

    localStorage.setItem("pantryproductInventory", productData);
  } else {
    // Update the product inventory from localStorage
    const productData = storedInventory.split("|"); // Split by the delimiter
    productData.forEach((productStr) => {
      const [id, name, category, imageSrc, price, inventory] =
        productStr.split(",");
      const product = products.find((p) => p.id === parseInt(id));
      if (product) {
        product.name = name;
        product.category = category;
        product.imageSrc = imageSrc;
        product.price = parseFloat(price);
        product.inventory = parseInt(inventory);
      }
    });
  }
}

initializeFrozenProductInventory();

if (!localStorage.getItem("cart")) {
  // Initialize the cart in localStorage
  localStorage.setItem("cart", "");
  console.log("local storage created");
}

function addToCart(productId) {
  // console.log("Clicked" + productId);
  const product = products.find((product) => product.id === productId);

  if (product && product.inventory > 0) {
    // Check if the product is already in the cart
    const cartData = localStorage.getItem("cart");
    const cartItems = cartData ? cartData.split("|") : [];
    // console.log(cartItems);
    let updatedCart = [];
    let cartItemExists = false;

    cartItems.forEach((item) => {
      const [cartProductId, cartName, cartQuantity, cartPrice] =
        item.split(":");
      if (parseInt(cartProductId) === productId) {
        const newQuantity = parseInt(cartQuantity) + 1;
        updatedCart.push(
          `${productId}:${cartName}:${newQuantity}:${product.price}`
        );
        cartItemExists = true;
      } else {
        updatedCart.push(item);
      }
    });

    if (!cartItemExists) {
      updatedCart.push(`${productId}:${product.name}:1:${product.price}`);
    }

    // Update the cart in local storage
    const updatedCartData = updatedCart.join("|");
    localStorage.setItem("cart", updatedCartData);

    // Decrement the product inventory
    product.inventory--;
    // console.log("1");
    // document.getElementById(productId).innerHTML =
    //   "Inventory: " + product.inventory;
    // console.log("1");
    // Update the product inventory in local storage
    updateAllInventory();
  } else {
    alert("This item is out of stock.");
  }
}

// Call the updateAllInventory function when an item is added to the cart
function updateAllInventory() {
  // console.log("updateAllInventory");
  // Update the product inventory in local storage
  let inventoryString = "";
  products.forEach((product, index) => {
    // console.log(index);
    inventoryString += `${product.id},${product.name},${product.category},${product.imageSrc},${product.price},${product.inventory}`;
    if (index < products.length - 1) {
      inventoryString += "|";
    }
  });
  localStorage.setItem("pantryproductInventory", inventoryString);
}

function onCategoryChange() {
  const categoryDropdown = document.getElementById("category-dropdown");
  const selectedCategory = categoryDropdown.value;
  generateProductCards(selectedCategory);
}

generateProductCards("shop-all");
