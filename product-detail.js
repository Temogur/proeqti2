const API_BASE = "https://api.everrest.educata.dev";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

const urlParams = new URLSearchParams(window.location.search);
const productIdFromUrl = urlParams.get("id");

let product = null;

document.addEventListener("DOMContentLoaded", async () => {
  if (productIdFromUrl) {
    await fetchProductById(productIdFromUrl);
  } else {
    product = JSON.parse(localStorage.getItem("currentProduct"));
    if (!product) {
      window.location.href = "index.html";
      return;
    }
    initPage();
  }
});

async function fetchProductById(id) {
  try {
    const response = await fetch(`${API_BASE}/shop/products/id/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
      return;
    }

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    product = await response.json();
    initPage();
  } catch (error) {
    console.error("პროდუქტის ჩატვირთვის შეცდომა:", error);
    product = JSON.parse(localStorage.getItem("currentProduct"));
    if (!product) {
      window.location.href = "index.html";
      return;
    }
    initPage();
  }
}

function initPage() {
  displayProductDetails();
  loadReviews();
  updateCartCount();
  setupEventListeners();
}

const CATEGORY_TRANSLATIONS = {
  phones: "სმართფონები",
  laptops: "ლეპტოპები",
  tablets: "ტაბლეტები",
  audio: "აუდიო",
  wearables: "სმარტ საათები",
  monitors: "მონიტორები",
  accessories: "აქსესუარები",
  cameras: "კამერები",
  gaming: "გეიმინგი",
  other: "სხვა",
};

function getCategoryGeo(category) {
  if (!category) return "სხვა";
  const key = (
    typeof category === "object" ? category.name : category || ""
  ).toLowerCase();
  return CATEGORY_TRANSLATIONS[key] || key;
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

  const thumbnail = cleanUrl(product.thumbnail);
  if (thumbnail && !thumbnail.includes("alta.ge")) return thumbnail;
  if (product.images && product.images.length > 0) {
    const img = cleanUrl(product.images[0]);
    if (img && !img.includes("alta.ge")) return img;
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

  if (brand === "samsung" && cat === "phones")
    return "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop&q=80";
  if (brand === "xiaomi" && cat === "phones")
    return "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop&q=80";
  if (brand === "honor" && cat === "phones")
    return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&q=80";
  if (brand === "oneplus" && cat === "phones")
    return "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop&q=80";
  if (brand === "apple" && cat === "phones")
    return "https://images.unsplash.com/photo-1678911820864-e5c43ceb7e0d?w=600&h=600&fit=crop&q=80";
  if (brand === "apple" && cat === "laptops")
    return "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop&q=80";
  if (brand === "asus" && cat === "laptops")
    return "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop&q=80";
  if (brand === "lenovo" && cat === "laptops")
    return "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop&q=80";
  if (brand === "hp" && cat === "laptops")
    return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&q=80";
  if (brand === "acer" && cat === "laptops")
    return "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop&q=80";

  const categoryImages = {
    phones:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&q=80",
    laptops:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&q=80",
    tablets:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop&q=80",
    audio:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=80",
    wearables:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&q=80",
    monitors:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop&q=80",
  };
  return (
    categoryImages[cat] ||
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop&q=80"
  );
}

function displayProductDetails() {
  const imgEl = document.getElementById("productImage");
  const imgUrl = getProductImage(product);
  imgEl.src = imgUrl;
  imgEl.onerror = () => {
    imgEl.src =
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop&q=80";
  };

  document.getElementById("productTitle").textContent =
    product.title || product.name || "უცნობი";

  const rawPrice = product.price?.current ?? product.price ?? 0;
  const gelPrice =
    product.price?.currency === "GEL" || rawPrice > 100
      ? rawPrice
      : Math.round(rawPrice * 2.72);
  document.getElementById("productPrice").textContent = gelPrice + " ₾";

  document.getElementById("productBrand").textContent = product.brand || "N/A";
  document.getElementById("productCategory").textContent = getCategoryGeo(
    product.category,
  );

  let stock = product.stock ?? 0;

  const stockElement = document.getElementById("productStock");
  stockElement.textContent = stock + " ცალი";
  if (stock === 0) {
    stockElement.style.color = "var(--error)";
    stockElement.textContent = "არ არის საწყობში";
  } else if (stock < 5) {
    stockElement.style.color = "var(--error)";
  } else {
    stockElement.style.color = "var(--success)";
  }

  const descEl = document.getElementById("productDescription");
  const rawDesc =
    product.description || product.desc || product.details || null;

  if (!rawDesc) {
    descEl.innerHTML = "<p>აღწერა არ არის მითითებული</p>";
  } else {
    descEl.innerHTML =
      "<p style='color:var(--text-secondary)'>თარგმანი იტვირთება...</p>";
    translateToGeorgian(rawDesc)
      .then((translated) => {
        descEl.innerHTML = "<p>" + translated + "</p>";
      })
      .catch(() => {
        descEl.innerHTML = "<p>" + rawDesc + "</p>";
      });
  }

  const rating = product.rating || 0;
  const stars =
    "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  document.getElementById("productRating").innerHTML = `
    <span class="stars">${stars}</span>
    <span class="rating-number">(${Number(rating).toFixed(1)})</span>
  `;
}

function loadReviews() {
  const allReviews = JSON.parse(localStorage.getItem("productReviews")) || [];
  const productId = product._id || product.id;
  const productReviews = allReviews.filter(
    (review) => review.productId === productId,
  );
  displayReviews(productReviews);
}

function displayReviews(reviews) {
  const reviewsList = document.getElementById("reviewsList");
  const noReviews = document.getElementById("noReviews");

  if (!reviews || reviews.length === 0) {
    noReviews.style.display = "block";
    reviewsList.innerHTML = "";
    return;
  }

  noReviews.style.display = "none";
  reviewsList.innerHTML = "";

  reviews.forEach((review) => {
    const reviewElement = document.createElement("div");
    reviewElement.className = "review-item";

    const rating = review.rating || 0;
    const stars =
      "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
    const reviewDate = new Date(review.timestamp).toLocaleDateString("ka-GE");

    reviewElement.innerHTML = `
      <div class="review-header">
        <div class="reviewer-name">${review.firstName} ${review.lastName}</div>
        <div class="review-rating">${stars} (${rating})</div>
      </div>
      <div class="review-comment">${review.comment || "კომენტარი არ არის"}</div>
      <div class="review-date" style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">${reviewDate}</div>
    `;

    reviewsList.appendChild(reviewElement);
  });
}

function setupEventListeners() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      document
        .querySelectorAll(".tab-pane")
        .forEach((pane) => (pane.style.display = "none"));

      btn.classList.add("active");
      const tabName = btn.dataset.tab;

      if (tabName === "details") {
        document.getElementById("detailsTab").style.display = "block";
      } else if (tabName === "reviews") {
        document.getElementById("reviewsTab").style.display = "block";
      }
    });
  });

  document
    .getElementById("addToCartBtn")
    .addEventListener("click", async () => {
      if ((product.stock ?? 0) === 0) {
        showNotification("ეს პროდუქტი ამჟამად მიუწვდომელია!", true);
        return;
      }

      const btn = document.getElementById("addToCartBtn");
      const originalText = btn.textContent;
      btn.textContent = "⏳ მიმდინარეობს...";
      btn.disabled = true;

      try {
        const productId = product._id || product.id;

        const cartCheck = await fetch(`${API_BASE}/shop/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cartExists = cartCheck.ok;

        const method = cartExists ? "PATCH" : "POST";
        const response = await fetch(`${API_BASE}/shop/cart/product`, {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: productId,
            quantity: 1,
          }),
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "login.html";
          return;
        }

        if (!response.ok && response.status !== 201) {
          const errData = await response.json().catch(() => ({}));
          if (errData.errorKeys?.includes("errors.token_expired")) {
            localStorage.removeItem("token");
            window.location.href = "login.html";
            return;
          }
          if (
            errData.errorKeys?.includes("errors.not_enough_stock_to_purchase")
          ) {
            showNotification(
              "სამწუხაროდ ეს პროდუქტი ამჟამად საწყობში არ არის!",
              true,
            );
          } else {
            showNotification(
              errData.error || "კალათაში დამატება ვერ მოხდა!",
              true,
            );
          }
          btn.textContent = originalText;
          btn.disabled = false;
          return;
        }

        if (response.ok || response.status === 201) {
          if (product.stock > 0) {
            product.stock -= 1;
            displayProductDetails();
          }
          showNotification("პროდუქტი დამატებულია კალათაში!");
          await updateCartCount();
          btn.textContent = "✓ დაემატა!";
          btn.style.background = "#16a34a";
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = "";
            btn.disabled = false;
          }, 1500);
        } else {
          const errData = await response.json().catch(() => ({}));
          console.error("API Error:", response.status, errData);
          throw new Error(
            errData.message || `Server error: ${response.status}`,
          );
        }
      } catch (error) {
        console.error("კალათაში დამატების შეცდომა:", error);
        showNotification("კალათაში დამატება ვერ მოხერხდა!", true);
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });

  document.getElementById("rateProductBtn").addEventListener("click", () => {
    openRatingModal();
  });

  document
    .getElementById("closeModal")
    .addEventListener("click", closeRatingModal);
  document
    .getElementById("cancelModal")
    .addEventListener("click", closeRatingModal);

  document.getElementById("ratingModal").addEventListener("click", (e) => {
    if (e.target.id === "ratingModal") {
      closeRatingModal();
    }
  });

  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const rating = star.dataset.rating;
      document.getElementById("ratingValue").value = rating;

      stars.forEach((s, index) => {
        if (index < rating) {
          s.textContent = "★";
          s.style.color = "var(--accent)";
        } else {
          s.textContent = "☆";
          s.style.color = "#ccc";
        }
      });
    });

    star.addEventListener("mouseenter", () => {
      const rating = star.dataset.rating;
      stars.forEach((s, index) => {
        if (index < rating) {
          s.textContent = "★";
          s.style.color = "var(--accent)";
        } else {
          s.textContent = "☆";
          s.style.color = "#ccc";
        }
      });
    });
  });

  document.getElementById("starRating").addEventListener("mouseleave", () => {
    const currentRating = document.getElementById("ratingValue").value;
    stars.forEach((s, index) => {
      if (currentRating && index < currentRating) {
        s.textContent = "★";
        s.style.color = "var(--accent)";
      } else {
        s.textContent = "☆";
        s.style.color = "#ccc";
      }
    });
  });

  document
    .getElementById("ratingForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      await submitRating();
    });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });
}

function openRatingModal() {
  document.getElementById("ratingModal").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeRatingModal() {
  document.getElementById("ratingModal").style.display = "none";
  document.body.style.overflow = "auto";
  document.getElementById("ratingForm").reset();
  document.getElementById("ratingValue").value = "";

  const stars = document.querySelectorAll(".star");
  stars.forEach((s) => {
    s.textContent = "☆";
    s.style.color = "#ccc";
  });
}

async function submitRating() {
  const rating = parseInt(document.getElementById("ratingValue").value);
  const firstName = document.getElementById("reviewerFirstName").value.trim();
  const lastName = document.getElementById("reviewerLastName").value.trim();
  const comment = document.getElementById("reviewComment").value.trim();

  if (!rating || !firstName || !lastName) {
    showNotification("გთხოვთ შეავსოთ ყველა სავალდებულო ველი!", true);
    return;
  }

  try {
    const productId = product._id || product.id;

    const rateResponse = await fetch(`${API_BASE}/shop/products/rate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
        score: rating,
      }),
    });

    if (rateResponse.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
      return;
    }

    if (rateResponse.status === 400) {
      const errData = await rateResponse.json().catch(() => ({}));
      if (
        errData.errorKeys?.includes("errors.token_expired") ||
        errData.errorKeys?.includes("errors.unauthorized")
      ) {
        localStorage.removeItem("token");
        showNotification("სესია ვადაგასულია, გთხოვთ ხელახლა შეხვიდეთ!", true);
        setTimeout(() => (window.location.href = "login.html"), 2000);
        return;
      }
    }

    const allReviews = JSON.parse(localStorage.getItem("productReviews")) || [];
    const newReview = {
      id: Date.now(),
      productId: productId,
      productName: product.title || product.name,
      rating: rating,
      firstName: firstName,
      lastName: lastName,
      comment: comment || "კომენტარი არ არის",
      timestamp: new Date().toISOString(),
    };

    allReviews.push(newReview);
    localStorage.setItem("productReviews", JSON.stringify(allReviews));

    showNotification("შეფასება წარმატებით დაემატა!");
    closeRatingModal();
    loadReviews();

    if (productIdFromUrl) {
      await fetchProductById(productIdFromUrl);
    } else {
      displayProductDetails();
    }
  } catch (error) {
    console.error("შეფასების შეცდომა:", error);
    showNotification("შეფასების გაგზავნა ვერ მოხერხდა!", true);
  }
}

async function updateCartCount() {
  try {
    const response = await fetch(`${API_BASE}/shop/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      const products = data.products || data || [];
      const count = products.reduce((t, i) => t + (i.quantity || 1), 0);
      const el = document.getElementById("cartCount");
      if (el) el.textContent = count;
    }
  } catch {}
}

function showNotification(message, isError = false) {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${isError ? "var(--error)" : "var(--accent)"};
    color: ${isError ? "white" : "var(--primary)"};
    padding: 1rem 2rem;
    border: 2px solid ${isError ? "var(--error)" : "var(--primary)"};
    z-index: 1000;
    animation: slideInRight 0.3s ease-out;
    font-weight: 600;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
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

async function translateToGeorgian(text) {
  const hasGeorgian = /[\u10D0-\u10FF]/.test(text);
  if (hasGeorgian) return text;

  const cacheKey = "desc_geo_" + btoa(encodeURIComponent(text.slice(0, 100)));
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return cached;
  } catch {}

  try {
    const url =
      "https://api.mymemory.translated.net/get?q=" +
      encodeURIComponent(text.slice(0, 500)) +
      "&langpair=en|ka";
    const res = await fetch(url);
    if (!res.ok) throw new Error("translate failed");
    const data = await res.json();
    const translated = data.responseData?.translatedText || text;
    try {
      localStorage.setItem(cacheKey, translated);
    } catch {}
    return translated;
  } catch {
    return text;
  }
}
