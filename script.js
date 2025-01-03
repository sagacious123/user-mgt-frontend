<script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>;
var notyf = new Notyf();
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  const API_URL = "https://user-mgt-backend.vercel.app/api";
  // const API_URL = "http://localhost:5001/api";
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href =
        data.role === "admin" ? "admin/users.html" : "dashboard.html";
    } else {
      notyf.error({
        message: data.message || data.error,
        position: { x: "right", y: "top" },
        duration: 4000,
      });
      // alert(data.message || data.error);
    }
  } catch (err) {
    console.error(err);
  }
});

function formatDate() {
  const date = new Date();

  const options = { month: "long" };
  const month = new Intl.DateTimeFormat("en-US", options).format(date);

  const day = date.getDate();
  const year = date.getFullYear();

  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = date.getHours() >= 12 ? "PM" : "AM";

  const ordinal =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  return `${month} ${day}${ordinal} ${year}, ${hours}:${minutes} ${period}`;
}

function toggleSidebar() {
  console.log("click");

  const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector(".main-content");
  sidebar.classList.toggle("visible");
  // mainContent.classList.toggle("sidebar-visible");
}
