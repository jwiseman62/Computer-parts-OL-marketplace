// Product list
let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, name: "Gaming Laptop", description: "High-end specs", price: 1500 },
    { id: 2, name: "Graphics Card", description: "RTX 4080", price: 900 },
    { id: 3, name: "SSD Drive", description: "1TB Storage", price: 120 },
  ];
  
  // Load products on Home page
  const productList = document.getElementById('product-list');
  if (productList) {
    loadProducts();
  }
  
  function loadProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
      const div = document.createElement('div');
      div.classList.add('product');
      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(div);
    });
  }
  
  function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Added to cart!");
  }
  
  // Cart Page
  const cartItems = document.getElementById('cart-items');
  if (cartItems) {
    loadCart();
  }
  
  function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      cartItems.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cart.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `<h3>${item.name}</h3><p>$${item.price}</p>`;
        cartItems.appendChild(div);
      });
    }
  }
  
  function checkout() {
    localStorage.removeItem('cart');
    alert("Thank you for your purchase!");
    window.location.href = "index.html";
  }
  
  // Inventory Management
  const inventoryForm = document.getElementById('inventoryForm');
  const inventoryList = document.getElementById('inventoryList');
  
  if (inventoryForm) {
    inventoryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('productName').value;
      const desc = document.getElementById('productDesc').value;
      const price = document.getElementById('productPrice').value;
  
      const newProduct = {
        id: products.length + 1,
        name,
        description: desc,
        price: parseFloat(price)
      };
  
      products.push(newProduct);
      localStorage.setItem('products', JSON.stringify(products));
      alert("Product added!");
      loadInventory();
    });
  }
  
  function loadInventory() {
    inventoryList.innerHTML = '';
    products.forEach(product => {
      const div = document.createElement('div');
      div.classList.add('product');
      div.innerHTML = `<h3>${product.name}</h3><p>${product.description}</p><p>$${product.price}</p>`;
      inventoryList.appendChild(div);
    });
  }
  if (inventoryList) loadInventory();
  
  // Login/Register
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;
      const account = JSON.parse(localStorage.getItem(username));
      if (account && account.password === password) {
        alert("Login successful!");
        window.location.href = "index.html";
      } else {
        alert("Invalid credentials.");
      }
    });
  }
  
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('registerUsername').value;
      const password = document.getElementById('registerPassword').value;
      localStorage.setItem(username, JSON.stringify({ password }));
      alert("Registration successful!");
      window.location.href = "login.html";
    });
  }