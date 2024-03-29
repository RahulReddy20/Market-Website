// window.addEventListener("beforeunload", () => {
//   localStorage.clear();
// });

const products = [
  {
    id: 1,
    name: "Broccoli",
    category: "all-vegetables",
    price: 1.99,
    inventory: 8,
  },
  {
    id: 2,
    name: "Potatoes",
    category: "all-vegetables",
    price: 0.69,
    inventory: 15,
  },
  {
    id: 3,
    name: "Red Chillies",
    category: "all-vegetables",
    price: 5.49,
    inventory: 5,
  },
  {
    id: 4,
    name: "Banana",
    category: "all-fruits",
    price: 1.69,
    inventory: 15,
  },
  {
    id: 5,
    name: "Apple",
    category: "all-fruits",
    price: 1.29,
    inventory: 8,
  },
  {
    id: 6,
    name: "Pre-cut Mango",
    category: "pre-cut-fruits",
    price: 5.49,
    inventory: 3,
  },
  {
    id: 7,
    name: "Fruit Salad Cup",
    category: "pre-cut-fruits",
    price: 6.99,
    inventory: 5,
  },
  {
    id: 8,
    name: "Sunflowers",
    category: "flowers",
    price: 54.99,
    inventory: 2,
  },
  {
    id: 9,
    name: "Roses",
    category: "flowers",
    price: 74.99,
    inventory: 5,
  },
  {
    id: 10,
    name: "Hummus",
    category: "salsa-and-dips",
    price: 9.99,
    inventory: 11,
  },
  {
    id: 11,
    name: "Pumpkin",
    category: "season-produce",
    price: 4.99,
    inventory: 5,
  },
  {
    id: 12,
    name: "Watermelon",
    category: "season-produce",
    price: 2.99,
    inventory: 8,
  },
  {
    id: 13,
    name: "Swiss Cheese",
    category: "new-items",
    price: 4.99,
    inventory: 5,
  },
  {
    id: 14,
    name: "Basil",
    category: "rollbacks",
    price: 0.69,
    inventory: 24,
  },
  {
    id: 15,
    name: "Pecans",
    category: "rollbacks",
    price: 9.99,
    inventory: 16,
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

      const imageSrc = `../Assets/freshpoducts/${product.name.toLowerCase()}.jpeg`;

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

function initializeProductInventory() {
  const storedInventory = localStorage.getItem("productInventory");

  if (!storedInventory) {
    // Initialize the product inventory in localStorage
    const productData = products
      .map((product) => {
        return `${product.id},${product.name},${product.category},${product.price},${product.inventory}`;
      })
      .join("|"); // Use a delimiter to separate the product data

    localStorage.setItem("productInventory", productData);
  } else {
    // Update the product inventory from localStorage
    const productData = storedInventory.split("|"); // Split by the delimiter
    productData.forEach((productStr) => {
      const [id, name, category, price, inventory] = productStr.split(",");
      const product = products.find((p) => p.id === parseInt(id));
      if (product) {
        product.name = name;
        product.category = category;
        product.price = parseFloat(price);
        product.inventory = parseInt(inventory);
      }
    });
  }
}

initializeProductInventory();

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
    inventoryString += `${product.id},${product.name},${product.category},${product.price},${product.inventory}`;
    if (index < products.length - 1) {
      inventoryString += "|";
    }
  });
  localStorage.setItem("productInventory", inventoryString);
}

function onCategoryChange() {
  const categoryDropdown = document.getElementById("category-dropdown");
  const selectedCategory = categoryDropdown.value;
  generateProductCards(selectedCategory);
}

generateProductCards("shop-all");
