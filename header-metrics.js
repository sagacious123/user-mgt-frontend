function loadHeaderMetrics(containerId, apiUrl) {
  loader.style.display = "flex";
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container with ID "${containerId}" not found.`);
    return;
  }

  // Fetch metrics data from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {

      // Populate the container with header metrics
      container.innerHTML = `
          <div class="metrics-container">
              <div class="card" id="balance-card">
                <h3>Account Balance</h3>
                <p>$<span id="balance">${
                  data.balance.toLocaleString() || 0
                }</span></p>
              </div>
              <div class="card" id="transactions-card">
                <h3>Recent Transactions</h3>
                <p>$<span id="transactions">${0}</span></p>
              </div>
              <div class="card" id="savings-card">
                <h3>Refunds processed</h3>
                <p>$<span id="savings">${0}</span></p>
              </div>
              <div class="card" id="expenditures-card">
                <h3>Total Expenditures</h3>
                <p>$<span id="expenditures">${0}</span></p>
              </div>
            </div>
            <div class="container">
          <div id="profile-details" class="profile-details-card">
            <div id="user-info">
                <p>Welcome ${data.name}</p>
            <p>Account balance as at ${formatDate()}</p>
            <p class="bal">$${data.balance.toLocaleString()}</p>
                </div>
            <div id="account-info">
          <p>Account No: <strong>${data.accountNumber}</strong></p>
          <p>Account Status: <strong>Active</strong></p>
          <p>Account Type: <strong>NON RESIDENCE ACCOUNT</strong></p>
          </div>
            </div>
        </div>
        `;
      loader.style.display = "none";
    })
    .catch((error) => {
      loader.style.display = "none";
      console.error("Error fetching metrics:", error);
      container.innerHTML = `<p>Error loading metrics. Please try again later.</p>`;
    });
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}
