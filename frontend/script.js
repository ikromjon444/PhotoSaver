const form = document.getElementById("authForm");
const title = document.getElementById("form-title");
const switchBtn = document.getElementById("switch");
const message = document.getElementById("message");

let isLogin = true;
const API_URL = "https://photosaver-backend.onrender.com//api/auth";

switchBtn.addEventListener("click", () => {
  isLogin = !isLogin;
  title.textContent = isLogin ? "Login" : "Register";
  switchBtn.textContent = isLogin ? "Register" : "Login";
  message.textContent = "";
  form.querySelector("button").textContent = isLogin ? "Login" : "Register";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const endpoint = isLogin ? "/login" : "/register";

  try {
    const res = await fetch(API_URL + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      message.textContent = data.message || "Xatolik";
      return;
    }

    message.style.color = "green";
    message.textContent = "Muvaffaqiyatli!";

    // LOGIN yoki REGISTER muvaffaqiyatli bo‘lsa
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    // 1 soniya kutib panelga yuborish
    setTimeout(() => {
      window.location.href = "panel.html";
    }, 1000);

  } catch (err) {
    message.textContent = "Server bilan aloqa yo‘q";
  }
});
