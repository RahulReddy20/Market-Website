const unfiltered_products = [
  {
    id: 601,
    name: "Chips",
    category: "snacks",
    price: 2.99,
    inventory: 14,
  },
  {
    id: 602,
    name: "Beef Jerky",
    category: "snacks",
    price: 4.49,
    inventory: 16,
  },
  {
    id: 603,
    name: "Peanuts",
    category: "snacks",
    price: 1.99,
    inventory: 12,
  },
  // Add more products here...
];

products = unfiltered_products;

function generateProductCards() {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";
  //   console.log(products);
  if (document.getElementById("search-input").value.toLowerCase()) {
  }
  products = unfiltered_products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(document.getElementById("search-input").value.toLowerCase())
  );
  //   console.log(products);
  products.forEach(
    (product) => {
      // if (category === "shop-all" || product.category === category) {
      const card = document.createElement("div");
      card.classList.add("card");

      const imageSrc = `../Assets/snacks/${product.name.toLowerCase()}.jpeg`;

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
                            <input type='number' placeholder="enter quantity" id="quantityof" value="1" min="1"/>
                            <button class="button-style" onclick="addToCart(${
                              product.id
                            })">Add to Cart</button>
                        </div>
                    `;

      cardContainer.appendChild(card);
    }
    //   }
  );
}

function initializeSnacksProductInventory() {
  //   console.log("initializing frozen product");
  const storedInventory = localStorage.getItem("snacksproductInventory");

  if (!storedInventory) {
    // Initialize the product inventory in localStorage
    console.log("initializing candy product");
    const productData = products
      .map((product) => {
        return `${product.id},${product.name},${product.category},${product.price},${product.inventory}`;
      })
      .join("|"); // Use a delimiter to separate the product data

    localStorage.setItem("snacksproductInventory", productData);
  } else {
    // Update the product inventory from localStorage
    // console.log("hi");
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
  //   if (localStorage.getItem("cart")) {
  //     // Initialize the cart in localStorage
  //     localStorage.setItem("cart", "");
  //   }
}

initializeSnacksProductInventory();

if (!localStorage.getItem("cart")) {
  // Initialize the cart in localStorage
  localStorage.setItem("cart", "");
  console.log("local storage created");
}

function addToCart(productId) {
  // console.log("Clicked" + productId);
  // alert(document.getElementById('quantityof').value+" -> "+typeof(parseInt(document.getElementById('quantityof').value)));

  const product = products.find((product) => product.id === productId);
  //   console.log(product);
  if (
    product &&
    product.inventory > 0 &&
    document.getElementById("quantityof").value <= product.inventory
  ) {
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
        const newQuantity =
          parseInt(cartQuantity) +
          parseInt(document.getElementById("quantityof").value);
        updatedCart.push(
          `${productId}:${cartName}:${newQuantity}:${product.price}`
        );
        cartItemExists = true;
      } else {
        updatedCart.push(item);
      }
    });

    if (!cartItemExists) {
      updatedCart.push(
        `${productId}:${product.name}:${parseInt(
          document.getElementById("quantityof").value
        )}:${product.price}`
      );
    }

    const updatedCartData = updatedCart.join("|");
    localStorage.setItem("cart", updatedCartData);

    product.inventory -= document.getElementById("quantityof").value;
    // document.getElementById(productId).innerHTML =
    //   "Inventory : " + product.inventory;

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
    console.log(index);
    inventoryString += `${product.id},${product.name},${product.category},${product.price},${product.inventory}`;
    if (index < products.length - 1) {
      inventoryString += "|";
    }
  });
  localStorage.setItem("snacksproductInventory", inventoryString);
}

function searchFunction() {
  if (/^[a-zA-Z]+$/.test(document.getElementById("search-input").value)) {
    generateProductCards();
  } else {
    alert("No numbers allowed");
  }
}

// function onCategoryChange() {
//   const categoryDropdown = document.getElementById("category-dropdown");
//   const selectedCategory = categoryDropdown.value;
//   generateProductCards(selectedCategory);
// }

generateProductCards();
