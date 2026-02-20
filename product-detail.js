const API_BASE = "https://api.everrest.educata.dev";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

const product = JSON.parse(localStorage.getItem("currentProduct"));

if (!product) {
  window.location.href = "index.html";
} else {
  document.addEventListener("DOMContentLoaded", () => {
    displayProductDetails();
    loadReviews();
    updateCartCount();
    setupEventListeners();
  });
}

function displayProductDetails() {
  document.getElementById("productImage").src = product.image;
  document.getElementById("productTitle").textContent = product.name;
  document.getElementById("productPrice").textContent = product.price + " ₾";
  document.getElementById("productBrand").textContent = product.brand;
  document.getElementById("productCategory").textContent = product.category;

  const stock = product.stock || 0;
  const stockElement = document.getElementById("productStock");
  stockElement.textContent = stock + " ცალი";
  if (stock === 0) {
    stockElement.style.color = "var(--error)";
    stockElement.textContent = "არ არის საწყობში";
  } else if (stock < 5) {
    stockElement.style.color = "var(--error)";
  }

  const releaseDate = product.release_date || "არ არის მითითებული";
  document.getElementById("productReleaseDate").textContent = releaseDate;

  document.getElementById("productDescription").innerHTML =
    "<p>" + product.description + "</p>";

  const rating = product.rating || 0;
  const stars =
    "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  document.getElementById("productRating").innerHTML = `
    <span class="stars">${stars}</span>
    <span class="rating-number">(${rating.toFixed(1)})</span>
  `;
}

function loadReviews() {
  const allReviews = JSON.parse(localStorage.getItem("productReviews")) || [];

  const productReviews = allReviews.filter(
    (review) => review.productId === product.id,
  );

  console.log("Total reviews:", allReviews.length);
  console.log("Reviews for", product.name + ":", productReviews.length);

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

  document.getElementById("addToCartBtn").addEventListener("click", () => {
    if (product.stock === 0) {
      showNotification("პროდუქტი არ არის საწყობში!", true);
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        showNotification("საწყობში მეტი რაოდენობა არ არის!", true);
        return;
      }
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        rating: product.rating,
        stock: product.stock,
        reviews_count: product.reviews_count || 0,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showNotification("პროდუქტი დამატებულია კალათაში!");
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
      submitRating();
    });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
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

function submitRating() {
  const rating = parseInt(document.getElementById("ratingValue").value);
  const firstName = document.getElementById("reviewerFirstName").value.trim();
  const lastName = document.getElementById("reviewerLastName").value.trim();
  const comment = document.getElementById("reviewComment").value.trim();

  if (!rating || !firstName || !lastName) {
    showNotification("გთხოვთ შეავსოთ ყველა სავალდებულო ველი!", true);
    return;
  }

  const allReviews = JSON.parse(localStorage.getItem("productReviews")) || [];

  const newReview = {
    id: Date.now(),
    productId: product.id,
    productName: product.name,
    rating: rating,
    firstName: firstName,
    lastName: lastName,
    comment: comment || "კომენტარი არ არის",
    timestamp: new Date().toISOString(),
  };

  allReviews.push(newReview);

  localStorage.setItem("productReviews", JSON.stringify(allReviews));
  console.log("✅ Review saved:", newReview);
  console.log("Total reviews now:", allReviews.length);

  product.reviews_count = (product.reviews_count || 0) + 1;
  localStorage.setItem("currentProduct", JSON.stringify(product));

  showNotification("შეფასება წარმატებით დაემატა!");

  closeRatingModal();

  loadReviews();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cartCount").textContent = count;
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
