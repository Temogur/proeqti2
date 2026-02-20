const API_BASE = "https://api.everrest.educata.dev";

function showStatus(message, isError = false) {
  const status = document.createElement("div");
  status.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${isError ? "#c62828" : "#2e7d32"};
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        z-index: 10000;
        font-family: Arial, sans-serif;
    `;
  status.textContent = message;
  document.body.appendChild(status);
  setTimeout(() => status.remove(), 5000);
}

const existingToken = localStorage.getItem("token");
console.log("Existing token on page load:", existingToken);
if (existingToken) {
  console.log("Token found, redirecting to index.html");
  window.location.href = "index.html";
}

document.getElementById("showRegister")?.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".login-box:first-child").style.display = "none";
  document.getElementById("registerBox").style.display = "block";
});

document.getElementById("showLogin")?.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".login-box:first-child").style.display = "block";
  document.getElementById("registerBox").style.display = "none";
});

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("errorMessage");

  errorMessage.style.display = "none";

  if (password.length < 8) {
    errorMessage.textContent = "პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო";
    errorMessage.style.display = "block";
    showStatus("პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო", true);
    return;
  }

  console.log("Attempting login with:", email);
  showStatus("მიმდინარეობს ავტორიზაცია...");

  try {
    const response = await fetch(`${API_BASE}/auth/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("API Response:", data);

    if (response.ok) {
      const token = data.access_token || data.token || data.accessToken;

      console.log("Token found:", token ? "YES" : "NO");

      if (token) {
        localStorage.setItem("token", token);

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        showStatus("ავტორიზაცია წარმატებული! გადამისამართება...");

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } else {
        console.error("No token in response");
        errorMessage.textContent =
          "ავტორიზაცია წარმატებული, მაგრამ ტოკენი ვერ მოიძებნა";
        errorMessage.style.display = "block";
        showStatus("ტოკენი ვერ მოიძებნა", true);
      }
    } else {
      console.error("Login failed:", data);
      const msg = data.message || data.error || "ავტორიზაცია ვერ მოხერხდა";
      errorMessage.textContent = msg;
      errorMessage.style.display = "block";
      showStatus(msg, true);
    }
  } catch (error) {
    console.error("Login error:", error);
    errorMessage.textContent = "სერვერთან კავშირის შეცდომა: " + error.message;
    errorMessage.style.display = "block";
    showStatus("შეცდომა: " + error.message, true);
  }
});

document
  .getElementById("registerForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("regFirstName").value.trim();
    const lastName = document.getElementById("regLastName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const passwordConfirm = document.getElementById("regPasswordConfirm").value;
    const errorMessage = document.getElementById("regErrorMessage");

    errorMessage.style.display = "none";

    if (password.length < 8) {
      errorMessage.textContent = "პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო";
      errorMessage.style.display = "block";
      showStatus("პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო", true);
      return;
    }

    if (password !== passwordConfirm) {
      errorMessage.textContent = "პაროლები არ ემთხვევა";
      errorMessage.style.display = "block";
      showStatus("პაროლები არ ემთხვევა", true);
      return;
    }

    console.log("=== REGISTRATION ATTEMPT ===");
    console.log("Email:", email);
    console.log("Name:", firstName, lastName);

    showStatus("მიმდინარეობს რეგისტრაცია...");

    const payload = {
      firstName: firstName,
      lastName: lastName,
      age: 25,
      email: email,
      password: password,
      address: "Tbilisi",
      phone: "+995555000000",
      zipcode: "0177",
      avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${firstName}`,
      gender: "OTHER",
    };

    console.log("Sending payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(`${API_BASE}/auth/sign_up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);

      const responseText = await response.text();
      console.log("Raw response:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Parsed JSON:", data);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        errorMessage.textContent =
          "სერვერმა დააბრუნა არასწორი ფორმატი. გთხოვთ გადაამოწმოთ კონსოლი.";
        errorMessage.style.display = "block";
        showStatus("სერვერის შეცდომა", true);
        return;
      }

      if (response.ok) {
        console.log("✓ Registration successful!");
        console.log("User created:", data);

        showStatus("რეგისტრაცია წარმატებული! მიმდინარეობს ავტორიზაცია...");

        try {
          const loginResponse = await fetch(`${API_BASE}/auth/sign_in`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });

          if (loginResponse.ok) {
            const loginData = await loginResponse.json();
            const token =
              loginData.access_token ||
              loginData.token ||
              loginData.accessToken;

            if (token) {
              localStorage.setItem("token", token);
              localStorage.setItem("user", JSON.stringify(data));

              showStatus(
                "რეგისტრაცია და ავტორიზაცია წარმატებული! გადამისამართება...",
              );

              setTimeout(() => {
                window.location.href = "index.html";
              }, 1000);
            }
          } else {
            errorMessage.textContent =
              "რეგისტრაცია წარმატებული! გთხოვთ შეხვიდეთ თქვენი ანგარიშით.";
            errorMessage.style.display = "block";
            showStatus("გთხოვთ შეხვიდეთ თქვენი ანგარიშით", false);

            setTimeout(() => {
              document.querySelector(".login-box:first-child").style.display =
                "block";
              document.getElementById("registerBox").style.display = "none";
              document.getElementById("email").value = email;
            }, 2000);
          }
        } catch (loginError) {
          console.error("Auto-login error:", loginError);
          errorMessage.textContent =
            "რეგისტრაცია წარმატებული! გთხოვთ შეხვიდეთ თქვენი ანგარიშით.";
          errorMessage.style.display = "block";
        }
      } else {
        console.error("✗ Registration failed");
        console.error("Error data:", data);

        let msg = "რეგისტრაცია ვერ მოხერხდა";

        if (data.message) {
          msg = data.message;
        } else if (data.error) {
          if (typeof data.error === "string") {
            msg = data.error;
          } else if (typeof data.error === "object") {
            msg = JSON.stringify(data.error);
          }
        } else if (data.errors) {
          if (typeof data.errors === "object") {
            const errorMessages = [];
            for (const [field, messages] of Object.entries(data.errors)) {
              if (Array.isArray(messages)) {
                errorMessages.push(...messages);
              } else {
                errorMessages.push(messages);
              }
            }
            msg = errorMessages.join(", ");
          } else {
            msg = data.errors;
          }
        }

        console.error("Error message:", msg);
        errorMessage.textContent = msg;
        errorMessage.style.display = "block";
        showStatus(msg, true);
      }
    } catch (error) {
      console.error("Network or fetch error:", error);
      console.error("Error stack:", error.stack);
      errorMessage.textContent = "სერვერთან კავშირის შეცდომა: " + error.message;
      errorMessage.style.display = "block";
      showStatus("შეცდომა: " + error.message, true);
    }
  });

console.log("Auth script loaded successfully");
console.log("Using API endpoints:");
console.log("- Login: /auth/sign_in");
console.log("- Signup: /auth/sign_up");
