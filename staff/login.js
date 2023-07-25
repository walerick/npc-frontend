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

    fetch("http://localhost:8080/api/v1/registrar/login", {
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
        // Perform further actions with the user's credentials
        // For example, redirect to the dashboard
        window.location.href = "/staff/dashboard.html";
      })
      .catch((error) => {
        // Handle login failure or any other errors
        var errorElement = document.getElementById("error-message");
        errorElement.textContent = "Invalid username or password.";
        console.error(error);
      });
  });
