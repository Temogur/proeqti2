const API_BASE = "https://api.everrest.educata.dev";

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  updateCartCount();
  setupEventListeners();
});

function setupEventListeners() {
  document.getElementById("logoutBtn").addEventListener("click", logout);
}

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  displayCart(cart);
}

function displayCart(cart) {
  const cartItems = document.getElementById("cartItems");
  const emptyCart = document.getElementById("emptyCart");
  const cartSummary = document.getElementById("cartSummary");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.style.display = "none";
    emptyCart.style.display = "block";
    cartSummary.style.display = "none";
    return;
  }

  cartItems.style.display = "grid";
  emptyCart.style.display = "none";
  cartSummary.style.display = "block";

  cart.forEach((item) => {
    const cartItem = createCartItem(item);
    cartItems.appendChild(cartItem);
  });

  updateSummary(cart);
}

function createCartItem(item) {
  const itemDiv = document.createElement("div");
  itemDiv.className = "cart-item";

  const rating = item.rating || 0;
  const stars =
    "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));

  const stock = item.stock || 0;
  const reviewsCount = item.reviews_count || 0;

  itemDiv.innerHTML = `
        <img src="${item.image || "https://via.placeholder.com/150"}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-meta">
                <span style="font-weight: 600;">საწყობში:</span> 
                <span style="color: ${stock < 5 ? "var(--error)" : "var(--success)"}; font-weight: 600;">
                    ${stock} ცალი
                </span>
            </div>
            <div class="cart-item-meta">
                <span class="stars">${stars}</span>
                <span>(${rating.toFixed(1)})</span>
            </div>
            <div class="cart-item-meta">
                <span style="font-weight: 600;">Reviews:</span> ${reviewsCount}
            </div>
            <div class="cart-item-price">${item.price} ₾</div>
        </div>
        <div class="cart-item-actions">
            <div class="quantity-control">
                <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
            </div>
            <button class="remove-btn" data-id="${item.id}">წაშლა</button>
        </div>
    `;

  itemDiv.querySelector(".decrease-btn").addEventListener("click", () => {
    updateQuantity(item.id, -1);
  });

  itemDiv.querySelector(".increase-btn").addEventListener("click", () => {
    updateQuantity(item.id, 1);
  });

  itemDiv.querySelector(".remove-btn").addEventListener("click", () => {
    removeFromCart(item.id);
  });

  return itemDiv;
}

function updateQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((i) => i.id === productId);

  if (item) {
    item.quantity += change;

    if (item.quantity < 1) {
      item.quantity = 1;
    } else if (item.quantity > item.stock) {
      item.quantity = item.stock;
      showNotification("საწყობში მეტი რაოდენობა არ არის!");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
  }
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
  showNotification("პროდუქტი წაიშალა კალათიდან");
}

function updateSummary(cart) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  document.getElementById("totalItems").textContent = totalItems;
  document.getElementById("totalPrice").textContent =
    `${totalPrice.toFixed(2)} ₾`;
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cartCount").textContent = count;
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--accent);
        color: var(--primary);
        padding: 1rem 2rem;
        border: 2px solid var(--primary);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("cart");
  window.location.href = "login.html";
}

const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

document.querySelector(".btn-checkout")?.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("კალათა ცარიელია!");
    return;
  }

  alert("გადახდის ფუნქციონალი მალე დაემატება!");
});
