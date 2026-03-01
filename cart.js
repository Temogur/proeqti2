const API_BASE = "https://api.everrest.educata.dev";

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  setupEventListeners();
});

function setupEventListeners() {
  document.getElementById("logoutBtn").addEventListener("click", logout);
  document
    .querySelector(".btn-checkout")
    ?.addEventListener("click", handleCheckout);
}

async function loadCart() {
  try {
    const response = await fetch(`${API_BASE}/shop/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
      return;
    }

    if (response.status === 404 || response.status === 409) {
      displayCart([]);
      updateCartCount(0);
      return;
    }

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    const cartItems = data.products || data || [];

    const enriched = await Promise.all(
      cartItems.map(async (item) => {
        const pid = item.productId || item._id || item.id;
        try {
          const r = await fetch(`${API_BASE}/shop/products/id/${pid}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!r.ok) return { ...item, _id: pid };
          const p = await r.json();
          return {
            ...p,
            _id: pid,
            quantity: item.quantity || 1,
            pricePerQuantity: item.pricePerQuantity,
          };
        } catch {
          return { ...item, _id: pid };
        }
      }),
    );

    displayCart(enriched);
    updateCartCount(enriched.reduce((sum, i) => sum + (i.quantity || 1), 0));
  } catch (error) {
    console.error("კალათის ჩატვირთვის შეცდომა:", error);
    showNotification("კალათის ჩატვირთვა ვერ მოხერხდა!", true);
    displayCart([]);
  }
}

function displayCart(cart) {
  const cartItems = document.getElementById("cartItems");
  const emptyCart = document.getElementById("emptyCart");
  const cartSummary = document.getElementById("cartSummary");

  cartItems.innerHTML = "";

  if (!cart || cart.length === 0) {
    cartItems.style.display = "none";
    emptyCart.style.display = "block";
    cartSummary.style.display = "none";
    return;
  }

  cartItems.style.display = "grid";
  emptyCart.style.display = "none";
  cartSummary.style.display = "block";

  cart.forEach((item) => cartItems.appendChild(createCartItem(item)));
  updateSummary(cart);
}

function getProductImage(product) {
  const productName = (product.title || product.name || "").toLowerCase();
  const brand = (product.brand || "").toLowerCase();
  const cat = (
    typeof product.category === "object"
      ? product.category?.name
      : product.category || ""
  ).toLowerCase();

  const cleanUrl = (url) => {
    if (!url || !url.trim()) return "";
    url = url.trim();
    url = url.replace(
      /\.(png|jpg|jpeg|webp|gif)\.(png|jpg|jpeg|webp|gif|jp)$/i,
      ".$1",
    );
    return url;
  };

  if (productName.includes("galaxy a54") || productName.includes("a546e"))
    return "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop&q=80";
  if (productName.includes("xiaomi 12 lite"))
    return "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop&q=80";
  if (productName.includes("honor 70"))
    return "https://th.bing.com/th/id/OIP.W0JrzNstllrdgAgCEVIM3AHaHa?w=189&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";
  if (productName.includes("oneplus 10t"))
    return "https://th.bing.com/th/id/OIP.nRPdfYk-wPtl2HF6a_Jo3wHaHa?w=198&h=198&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";
  if (productName.includes("iphone 14 pro"))
    return "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=300&h=300&fit=crop&q=80";

  const thumbnail = cleanUrl(product.thumbnail);
  if (thumbnail && !thumbnail.includes("alta.ge")) return thumbnail;
  if (product.images && product.images.length > 0) {
    const img = cleanUrl(product.images[0]);
    if (img && !img.includes("alta.ge")) return img;
  }

  if (productName.includes("iphone 14"))
    return "https://images.unsplash.com/photo-1678911820864-e5c43ceb7e0d?w=300&h=300&fit=crop&q=80";
  if (productName.includes("iphone 13"))
    return "https://images.unsplash.com/photo-1632633173522-c7d5b20a5d2b?w=300&h=300&fit=crop&q=80";
  if (productName.includes("macbook"))
    return "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop&q=80";

  if (brand === "samsung" && cat === "phones")
    return "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop&q=80";
  if (brand === "xiaomi" && cat === "phones")
    return "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop&q=80";
  if (brand === "apple" && cat === "phones")
    return "https://images.unsplash.com/photo-1678911820864-e5c43ceb7e0d?w=300&h=300&fit=crop&q=80";
  if (brand === "apple" && cat === "laptops")
    return "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop&q=80";
  if (brand === "asus" && cat === "laptops")
    return "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=300&fit=crop&q=80";
  if (brand === "lenovo" && cat === "laptops")
    return "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop&q=80";
  if (brand === "hp" && cat === "laptops")
    return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop&q=80";
  if (brand === "acer" && cat === "laptops")
    return "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=300&fit=crop&q=80";

  const categoryImages = {
    phones:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&q=80",
    laptops:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop&q=80",
    tablets:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop&q=80",
    audio:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&q=80",
    wearables:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&q=80",
    monitors:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop&q=80",
  };
  return (
    categoryImages[cat] ||
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop"
  );
}

function createCartItem(item) {
  const itemDiv = document.createElement("div");
  itemDiv.className = "cart-item";

  const id = item._id || item.id || "";
  const name = item.title || item.name || "";
  const rawPrice =
    item.pricePerQuantity ??
    (typeof item.price === "object"
      ? (item.price?.current ?? item.price?.beforeDiscount ?? 0)
      : (item.price ?? 0));
  const price =
    rawPrice > 100 ? Math.round(rawPrice) : Math.round(rawPrice * 2.72);
  const stock = item.stock ?? 0;
  const rating = Number(item.rating || 0);
  const stars =
    "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));

  const imgSrc = getProductImage(item);

  itemDiv.innerHTML = `
    <img src="${imgSrc}" alt="${name}" class="cart-item-image"
      onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop'">
    <div class="cart-item-details">
      <div class="cart-item-name">${name || "პროდუქტი"}</div>
      <div class="cart-item-meta">
        <span style="font-weight:600">საწყობში:</span>
        <span style="color:${stock === 0 ? "var(--error)" : stock < 5 ? "var(--error)" : "var(--success)"};font-weight:600">
          ${stock === 0 ? "არ არის" : stock + " ცალი"}
        </span>
      </div>
      <div class="cart-item-meta">
        <span class="stars">${stars}</span>
        <span>(${rating.toFixed(1)})</span>
      </div>
      <div class="cart-item-price">${price > 0 ? price + " ₾" : "—"}</div>
    </div>
    <div class="cart-item-actions">
      <div class="quantity-control">
        <button class="quantity-btn decrease-btn">-</button>
        <span class="quantity-value">${item.quantity || 1}</span>
        <button class="quantity-btn increase-btn">+</button>
      </div>
      <button class="remove-btn">წაშლა</button>
    </div>
  `;

  itemDiv.querySelector(".decrease-btn").addEventListener("click", () => {
    updateQuantity(id, (item.quantity || 1) - 1, item.stock ?? 0);
  });
  itemDiv.querySelector(".increase-btn").addEventListener("click", () => {
    updateQuantity(id, (item.quantity || 1) + 1, item.stock ?? 0);
  });
  itemDiv.querySelector(".remove-btn").addEventListener("click", () => {
    removeFromCart(id);
  });

  return itemDiv;
}

async function updateQuantity(productId, newQuantity, stock) {
  if (newQuantity < 1) return;
  if (stock > 0 && newQuantity > stock) {
    showNotification("საწყობში მეტი რაოდენობა არ არის!", true);
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/shop/cart/product`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: productId, quantity: newQuantity }),
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
      return;
    }

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "განახლება ვერ მოხერხდა");
    }

    await loadCart();
  } catch (error) {
    console.error("რაოდენობის განახლების შეცდომა:", error);
    showNotification("განახლება ვერ მოხერხდა!", true);
  }
}

async function removeFromCart(productId) {
  try {
    const response = await fetch(`${API_BASE}/shop/cart/product`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: productId }),
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
      return;
    }

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "წაშლა ვერ მოხერხდა");
    }

    showNotification("პროდუქტი წაიშალა კალათიდან");
    await loadCart();
  } catch (error) {
    console.error("წაშლის შეცდომა:", error);
    showNotification("წაშლა ვერ მოხერხდა!", true);
  }
}

function updateSummary(cart) {
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cart.reduce((sum, item) => {
    const rawPrice =
      item.pricePerQuantity ??
      (typeof item.price === "object"
        ? (item.price?.current ?? 0)
        : (item.price ?? 0));
    const price =
      rawPrice > 100 ? Math.round(rawPrice) : Math.round(rawPrice * 2.72);
    return sum + price * (item.quantity || 1);
  }, 0);

  document.getElementById("totalItems").textContent = totalItems;
  document.getElementById("totalPrice").textContent =
    totalPrice.toFixed(2) + " ₾";
}

function updateCartCount(count) {
  const el = document.getElementById("cartCount");
  if (el) el.textContent = count ?? 0;
}

function showNotification(message, isError = false) {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed; top: 100px; right: 20px;
    background: ${isError ? "var(--error)" : "var(--accent)"};
    color: ${isError ? "white" : "var(--primary)"};
    padding: 1rem 2rem;
    border: 2px solid ${isError ? "var(--error)" : "var(--primary)"};
    z-index: 1000; font-weight: 600;
    animation: slideInRight 0.3s ease-out;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 2500);
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

async function handleCheckout() {
  try {
    const response = await fetch(`${API_BASE}/shop/cart/checkout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      showNotification("სესია ვადაგასულია!", true);
      setTimeout(() => (window.location.href = "login.html"), 2000);
      return;
    }

    if (response.ok) {
      showNotification("შეკვეთა წარმატებით გაიგზავნა!");
      setTimeout(() => (window.location.href = "index.html"), 2000);
    } else {
      const err = await response.json().catch(() => ({}));
      showNotification(err.message || "გადახდა ვერ მოხერხდა!", true);
    }
  } catch (error) {
    console.error("Checkout error:", error);
    showNotification("სერვერთან კავშირის შეცდომა!", true);
  }
}

const style = document.createElement("style");
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);
