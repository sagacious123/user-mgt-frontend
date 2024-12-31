document.getElementById("loginForm").addEventListener("submit", async (e) => {

  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(
      `https://user-mgt-backend.vercel.app/api/user/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href =
        data.role === "admin" ? "admin/users.html" : "dashboard.html";
    } else {
      alert(data.message || data.error);
    }
  } catch (err) {
    console.error(err);
  }
});
