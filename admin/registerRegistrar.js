document
  .querySelector(".registerstaff-form")
  .addEventListener("submit", function (event) {
    // Prevent the form from submitting normally
    event.preventDefault();

    var jsonData = {
      username: document.querySelector(".username").value,
      password: document.querySelector(".password").value,
    };

    fetch("http://localhost:8080/api/v1/registrar/register-registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        window.location.href = "/admin/dashboard.html";
      })
      .catch((error) => {});
  });
