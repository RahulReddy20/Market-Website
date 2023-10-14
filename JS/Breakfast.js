// window.addEventListener("beforeunload", () => {
//   localStorage.clear();
// });

const products = [
  {
    id: 45,
    name: "Cornflakes",
    category: "the-cereal-shop",
    price: 1.99,
    inventory: 14,
  },
  {
    id: 46,
    name: "croissant",
    category: "breakfast-breads",
    price: 2.49,
    inventory: 16,
  },
  {
    id: 47,
    name: "Garlic Bread",
    category: "breakfast-breads",
    price: 2.99,
    inventory: 12,
  },
  {
    id: 48,
    name: "Granolabar",
    category: "rollbacks",
    price: 0.69,
    inventory: 28,
  },
  {
    id: 49,
    name: "Granola Cereal",
    category: "the-cereal-shop",
    price: 4.99,
    inventory: 7,
  },
  {
    id: 50,
    name: "Grits",
    category: "oatmeal-grits",
    price: 5.99,
    inventory: 10,
  },
  {
    id: 51,
    name: "Honey Bunches",
    category: "the-cereal-shop",
    price: 6.49,
    inventory: 16,
  },
  {
    id: 52,
    name: "Oatmeal",
    category: "oatmeal-grits",
    price: 5.99,
    inventory: 13,
  },
  {
    id: 53,
    name: "Pancake Mix",
    category: "pancakes-waffles",
    price: 2.99,
    inventory: 18,
  },
  {
    id: 54,
    name: "Waffles",
    category: "pancakes-waffles",
    price: 6.99,
    inventory: 8,
  },
  {
    id: 55,
    name: "Wheat Bread",
    category: "rollbacks",
    price: 0.99,
    inventory: 17,
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

      const imageSrc = `../Assets/breakfast_and_cereal/${product.name.toLowerCase()}.jpeg`;

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
  const storedInventory = localStorage.getItem("breakfastproductInventory");

  if (!storedInventory) {
    // Initialize the product inventory in localStorage
    const productData = products
      .map((product) => {
        return `${product.id},${product.name},${product.category},${product.imageSrc},${product.price},${product.inventory}`;
      })
      .join("|"); // Use a delimiter to separate the product data

    localStorage.setItem("breakfastproductInventory", productData);
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
  localStorage.setItem("breakfastproductInventory", inventoryString);
}

function onCategoryChange() {
  const categoryDropdown = document.getElementById("category-dropdown");
  const selectedCategory = categoryDropdown.value;
  generateProductCards(selectedCategory);
}

generateProductCards("shop-all");
