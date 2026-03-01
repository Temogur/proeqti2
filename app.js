const API_BASE = "https://api.everrest.educata.dev";

const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

let allProducts = [];
let filteredProducts = [];

document.addEventListener("DOMContentLoaded", async () => {
  await fetchProductsFromAPI();
  updateCartCount();
  setupEventListeners();
  updateCategoryCounts();
});

async function fetchProductsFromAPI() {
  try {
    showLoadingState();

    const LIMIT = 20;
    let page = 1;
    let collected = [];
    let total = null;

    while (true) {
      const response = await fetch(
        `${API_BASE}/shop/products/all?page_index=${page}&page_size=${LIMIT}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "login.html";
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const products = data.products || [];
      if (total === null) total = data.total ?? products.length;

      collected = collected.concat(products);
      if (products.length === 0 || collected.length >= total) break;
      page++;
    }

    allProducts = collected.map((p) => ({ ...p }));
    filteredProducts = [...allProducts];

    displayProducts(filteredProducts);
    updateCategoryCounts();
  } catch (error) {
    console.error("შეცდომა:", error);
    showErrorState("პროდუქტების ჩატვირთვა ვერ მოხერხდა.");
  }
}

function showLoadingState() {
  document.getElementById("productsGrid").innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:4rem;color:#666">
      <div style="font-size:2rem;margin-bottom:1rem">⏳</div>
      <div>იტვირთება პროდუქტები...</div>
    </div>`;
}

function showErrorState(message) {
  document.getElementById("productsGrid").innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:4rem;color:#e74c3c">
      <div style="font-size:2rem;margin-bottom:1rem">⚠️</div>
      <div>${message}</div>
      <button onclick="location.reload()" style="margin-top:1rem;padding:0.5rem 1rem;background:#ff6b00;color:white;border:none;border-radius:8px;cursor:pointer">თავიდან ცდა</button>
    </div>`;
}

function displayProducts(products) {
  const grid = document.getElementById("productsGrid");
  const noResults = document.getElementById("noResults");
  if (!products || products.length === 0) {
    grid.style.display = "none";
    noResults.style.display = "block";
    return;
  }
  grid.style.display = "grid";
  noResults.style.display = "none";
  grid.innerHTML = "";
  products.forEach((p) => grid.appendChild(createProductCard(p)));
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  const name = product.title || "უცნობი";
  const price = product.price?.current ?? "—";
  const oldPrice = product.price?.beforeDiscount;
  const discount = product.price?.discountPercentage;
  const category = product.category?.name || "სხვა";
  const brand = product.brand || "N/A";
  const rating = Number(product.rating || 0);
  const stock = product.stock || 0;
  const id = product._id || "";

  const cleanImageUrl = (url) => {
    if (!url || !url.trim()) return "";
    url = url.trim();
    url = url.replace(
      /\.(png|jpg|jpeg|webp|gif)\.(png|jpg|jpeg|webp|gif|jp)$/i,
      ".$1",
    );
    return url;
  };

  const getProductImageUrl = () => {
    const productName = name.toLowerCase();
    const productBrand = brand.toLowerCase();

    if (productName.includes("galaxy a54") || productName.includes("a546e")) {
      return "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop&q=80";
    }

    if (productName.includes("xiaomi 12 lite")) {
      return "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop&q=80";
    }

    if (productName.includes("honor 70")) {
      return "https://th.bing.com/th/id/OIP.W0JrzNstllrdgAgCEVIM3AHaHa?w=189&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";
    }

    if (productName.includes("oneplus 10t")) {
      return "https://th.bing.com/th/id/OIP.nRPdfYk-wPtl2HF6a_Jo3wHaHa?w=198&h=198&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";
    }

    if (productName.includes("iphone 14 pro")) {
      return "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=600&h=600&fit=crop&q=80";
    }

    const apiImage =
      cleanImageUrl(product.thumbnail) ||
      (product.images &&
        product.images.length > 0 &&
        cleanImageUrl(product.images[0]));

    if (apiImage && !apiImage.includes("alta.ge")) {
      return apiImage;
    }

    if (productName.includes("iphone 14 pro") && productName.includes("gold")) {
      return "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&h=600&fit=crop&q=80";
    }

    if (productName.includes("iphone 14")) {
      return "https://images.unsplash.com/photo-1678911820864-e5c43ceb7e0d?w=600&h=600&fit=crop&q=80";
    }

    if (productName.includes("iphone 13")) {
      return "https://images.unsplash.com/photo-1632633173522-c7d5b20a5d2b?w=600&h=600&fit=crop&q=80";
    }

    if (productName.includes("macbook")) {
      return "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop&q=80";
    }

    if (productBrand === "samsung" && category === "phones") {
      return "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop&q=80";
    }
    if (productBrand === "xiaomi" && category === "phones") {
      return "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop&q=80";
    }
    if (productBrand === "honor" && category === "phones") {
      return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&q=80";
    }
    if (productBrand === "oneplus" && category === "phones") {
      return "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop&q=80";
    }
    if (productBrand === "apple" && category === "phones") {
      return "https://images.unsplash.com/photo-1678911820864-e5c43ceb7e0d?w=600&h=600&fit=crop&q=80";
    }
    if (productBrand === "apple" && category === "laptops") {
      return "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop&q=80";
    }
    if (productBrand === "asus" && category === "laptops") {
      return "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop&q=80";
    }
    if (productBrand === "lenovo" && category === "laptops") {
      return "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop&q=80";
    }
    if (productBrand === "hp" && category === "laptops") {
      return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&q=80";
    }
    if (productBrand === "acer" && category === "laptops") {
      return "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop&q=80";
    }

    const categoryImages = {
      phones:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&q=80",
      laptops:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&q=80",
      tablets:
        "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop&q=80",
      audio:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=80",
      wearables:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&q=80",
      monitors:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop&q=80",
    };

    return categoryImages[category] || categoryImages["phones"];
  };

  const image = getProductImageUrl();

  const stars =
    "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  const stockClass =
    stock === 0 ? "out-of-stock" : stock < 10 ? "low-stock" : "in-stock";
  const stockText = stock === 0 ? "არ არის საწყობში" : `საწყობში: ${stock}`;
  const catDisplay =
    category === "phones"
      ? "სმართფონი"
      : category === "laptops"
        ? "ლეპტოპი"
        : category;
  const brandDisplay = brand.charAt(0).toUpperCase() + brand.slice(1);

  card.innerHTML = `
    <div class="product-image-container">
      ${image ? `<img src="${image}" alt="${name}" referrerpolicy="no-referrer" crossorigin="anonymous" onerror="this.style.display='none';const fb=document.createElement('div');fb.className='img-fallback';fb.innerHTML='<span class=\\'fallback-emoji\\'>${category === "phones" ? "📱" : category === "laptops" ? "💻" : category === "tablets" ? "📱" : category === "audio" ? "🎧" : category === "wearables" ? "⌚" : "🖥️"}</span><span class=\\'fallback-name\\'>${name.slice(0, 30)}${name.length > 30 ? "..." : ""}</span>';this.parentElement.appendChild(fb);">` : `<div class="img-fallback"><span class="fallback-emoji">${category === "phones" ? "📱" : category === "laptops" ? "💻" : "🖥️"}</span><span class="fallback-name">${name.slice(0, 30)}${name.length > 30 ? "..." : ""}</span></div>`}
      ${discount ? `<div class="product-discount-badge">-${discount}%</div>` : ""}
      <div class="product-badge ${stockClass}">${stockText}</div>
    </div>
    <div class="product-info">
      <div class="product-category">${catDisplay}</div>
      <h3 class="product-name" style="-webkit-line-clamp:2;">${name}</h3>
      <div class="product-brand">ბრენდი: ${brandDisplay}</div>
      <div class="product-rating">
        <span class="stars">${stars}</span>
        <span class="rating-value">(${rating.toFixed(1)})</span>
      </div>
      <div class="product-footer">
        <div class="product-price">
          ${Math.round(price * 2.72)} ₾
          ${oldPrice ? `<span style="text-decoration:line-through;color:#aaa;font-size:0.82rem;margin-left:6px">${Math.round(oldPrice * 2.72)} ₾</span>` : ""}
        </div>
      </div>
      <div style="display:flex;gap:0.5rem;margin-top:0.625rem;">
        <button class="btn-view-details" onclick="viewProduct('${id}')">დეტალები</button>
        <button class="btn-add-to-cart" ${stock === 0 ? 'disabled style="opacity:0.45;cursor:not-allowed"' : ""} onclick="addToCart('${id}', event)">
          ${stock === 0 ? "მიუწვდომელია" : "🛒 კალათა"}
        </button>
      </div>
    </div>`;
  return card;
}

async function addToCart(productId, event) {
  event.stopPropagation();
  const product = allProducts.find((p) => p._id === productId);
  if (!product) return;

  const btn = event.target;
  const original = btn.textContent;

  btn.textContent = "⏳";
  btn.disabled = true;

  try {
    const token = localStorage.getItem("token");

    const cartCheck = await fetch(`${API_BASE}/shop/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const cartExists = cartCheck.ok;

    const method = cartExists ? "PATCH" : "POST";
    const addRes = await fetch(`${API_BASE}/shop/cart/product`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: productId, quantity: 1 }),
    });

    if (addRes.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
      return;
    }

    if (!addRes.ok && addRes.status !== 201) {
      const errData = await addRes.json().catch(() => ({}));
      if (errData.errorKeys?.includes("errors.token_expired")) {
        localStorage.removeItem("token");
        window.location.href = "login.html";
        return;
      }
      console.warn("addToCart API failed:", errData);
    }

    const p = allProducts.find((p) => p._id === productId);
    if (p && p.stock > 0) p.stock -= 1;
  } catch (e) {
    console.warn("API addToCart failed, using localStorage only:", e.message);
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((item) => item._id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      _id: product._id,
      title: product.title,
      price: Math.round((product.price?.current ?? product.price ?? 0) * 2.72),
      thumbnail: product.thumbnail,
      images: product.images,
      brand: product.brand,
      stock: product.stock || 0,
      rating: product.rating || 0,
      quantity: 1,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  await updateCartCount();

  btn.textContent = "✓ დაემატა!";
  btn.style.background = "#16a34a";
  btn.style.borderColor = "#16a34a";
  btn.disabled = false;
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = "";
    btn.style.borderColor = "";
  }, 1200);
}

function viewProduct(productId) {
  const product = allProducts.find((p) => p._id === productId);
  if (product) {
    localStorage.setItem("currentProduct", JSON.stringify(product));
  }
  window.location.href = `product-detail.html?id=${productId}`;
}

function setupEventListeners() {
  document
    .getElementById("searchInput")
    ?.addEventListener("input", applyFilters);
  document
    .getElementById("categoryFilter")
    ?.addEventListener("change", applyFilters);
  document
    .getElementById("brandFilter")
    ?.addEventListener("change", applyFilters);
  document.getElementById("minPrice")?.addEventListener("input", applyFilters);
  document.getElementById("maxPrice")?.addEventListener("input", applyFilters);
  document
    .getElementById("minRating")
    ?.addEventListener("change", applyFilters);
  document
    .getElementById("sortSelect")
    ?.addEventListener("change", applyFilters);

  document.getElementById("resetFilters")?.addEventListener("click", () => {
    [
      "searchInput",
      "categoryFilter",
      "brandFilter",
      "minPrice",
      "maxPrice",
      "minRating",
      "sortSelect",
    ].forEach((id) => {
      document.getElementById(id).value = "";
    });
    applyFilters();
  });

  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    ["token", "user", "cart"].forEach((k) => localStorage.removeItem(k));
    window.location.href = "login.html";
  });
}

function applyFilters() {
  const search =
    document.getElementById("searchInput")?.value.toLowerCase() || "";
  const category = document.getElementById("categoryFilter")?.value || "";
  const brand = document.getElementById("brandFilter")?.value || "";
  const minPrice = parseFloat(document.getElementById("minPrice")?.value) || 0;
  const maxPrice =
    parseFloat(document.getElementById("maxPrice")?.value) || Infinity;
  const minRating =
    parseFloat(document.getElementById("minRating")?.value) || 0;
  const sortBy = document.getElementById("sortSelect")?.value || "";

  if (search.length >= 2) {
    fetchSearchResults(
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      minRating,
      sortBy,
    );
    return;
  }

  filteredProducts = allProducts.filter((p) => {
    const pBrand = (p.brand || "").toLowerCase();
    const pCat = (p.category?.name || "").toLowerCase();
    const pPrice = p.price?.current ?? 0;
    const pRate = Number(p.rating || 0);

    return (
      (!category || pCat === category.toLowerCase()) &&
      (!brand || pBrand === brand.toLowerCase()) &&
      pPrice >= minPrice &&
      pPrice <= maxPrice &&
      pRate >= minRating
    );
  });

  sortProducts(filteredProducts, sortBy);
  displayProducts(filteredProducts);
}

async function fetchSearchResults(
  keyword,
  category,
  brand,
  minPrice,
  maxPrice,
  minRating,
  sortBy,
) {
  try {
    showLoadingState();
    const response = await fetch(
      `${API_BASE}/shop/products/search?keyword=${encodeURIComponent(keyword)}&page_index=1&page_size=50`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
      return;
    }

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();
    let results = data.products || data || [];

    results = results.filter((p) => {
      const pBrand = (p.brand || "").toLowerCase();
      const pCat = (p.category?.name || "").toLowerCase();
      const pPrice = p.price?.current ?? 0;
      const pRate = Number(p.rating || 0);

      return (
        (!category || pCat === category.toLowerCase()) &&
        (!brand || pBrand === brand.toLowerCase()) &&
        pPrice >= minPrice &&
        pPrice <= maxPrice &&
        pRate >= minRating
      );
    });

    sortProducts(results, sortBy);
    displayProducts(results);
  } catch (error) {
    console.error("ძებნის შეცდომა:", error);
    filteredProducts = allProducts.filter((p) => {
      const name = (p.title || "").toLowerCase();
      const pBrand = (p.brand || "").toLowerCase();
      const pCat = (p.category?.name || "").toLowerCase();
      return (
        name.includes(keyword) ||
        pBrand.includes(keyword) ||
        pCat.includes(keyword)
      );
    });
    displayProducts(filteredProducts);
  }
}

function sortProducts(products, sortBy) {
  if (sortBy === "price-asc")
    products.sort((a, b) => (a.price?.current ?? 0) - (b.price?.current ?? 0));
  if (sortBy === "price-desc")
    products.sort((a, b) => (b.price?.current ?? 0) - (a.price?.current ?? 0));
  if (sortBy === "rating-desc")
    products.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
  if (sortBy === "name-asc")
    products.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
}

function filterByCategory(category) {
  document.getElementById("categoryFilter").value = category;
  applyFilters();
  document
    .getElementById("productsSection")
    .scrollIntoView({ behavior: "smooth" });
}

function filterByBrand(brand) {
  document.getElementById("brandFilter").value = brand;
  applyFilters();
  document
    .getElementById("productsSection")
    .scrollIntoView({ behavior: "smooth" });
}

function updateCategoryCounts() {
  const counts = {};
  allProducts.forEach((p) => {
    const cat = p.category?.name || "other";
    counts[cat] = (counts[cat] || 0) + 1;
  });

  const map = {
    სმართფონები: "phones",
    ლეპტოპები: "laptops",
    ტაბლეტები: "tablets",
    ტაბლეტი: "tablets",
    აუდიო: "audio",
    "სმარტ საათები": "wearables",
    მონიტორები: "monitors",
  };

  document.querySelectorAll(".category-card").forEach((card) => {
    const nameEl = card.querySelector(".category-name");
    const countEl = card.querySelector(".category-count");
    const name = nameEl?.textContent?.trim() || "";
    const key = Object.keys(map).find((k) => name.includes(k));
    if (!key) return;
    const count = counts[map[key]] || 0;
    if (count === 0) {
      card.style.display = "none";
    } else {
      card.style.display = "";
      if (countEl) countEl.textContent = `${count} პროდუქტი`;
    }
  });

  const categoryFilter = document.getElementById("categoryFilter");
  if (categoryFilter) {
    Array.from(categoryFilter.options).forEach((opt) => {
      if (!opt.value) return;
      const count = counts[opt.value] || 0;
      opt.hidden = count === 0;
    });
  }
}

async function updateCartCount() {
  try {
    const t = localStorage.getItem("token");
    if (!t) return;
    const response = await fetch(`${API_BASE}/shop/cart`, {
      headers: { Authorization: `Bearer ${t}` },
    });
    if (response.ok) {
      const data = await response.json();
      const products = data.products || data || [];
      const count = products.reduce((sum, i) => sum + (i.quantity || 1), 0);
      const el = document.getElementById("cartCount");
      if (el) el.textContent = count;
    } else {
      const el = document.getElementById("cartCount");
      if (el) el.textContent = 0;
    }
  } catch {}
}

window.filterByCategory = filterByCategory;
window.filterByBrand = filterByBrand;
window.viewProduct = viewProduct;

window.addToCart = addToCart;
