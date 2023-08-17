document
  .querySelector(".login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var form = event.target;
    var data = new FormData(form);
    var jsonData = {};

    for (var [key, value] of data.entries()) {
      jsonData[key] = value;
    }

    fetch("http://localhost:8080/api/v1/registrar/registrar-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        localStorage.setItem("registrarName", data.username);
        window.location.href = "/registrar/dashboard.html";
      })
      .catch((error) => {
        // Handle login failure or any other errors
        var errorElement = document.getElementById("error-message");
        errorElement.textContent =
          "Invalid credentials. Contact Admin to retrieve password.";
        console.error(error);
      });
  });
