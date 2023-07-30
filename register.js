document
  .querySelector(".register-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var form = event.target;
    var passwordInput = form.elements.password;
    var confirmPasswordInput = form.elements["confirm-password"];
    var errorElement = document.getElementById("error-message");
    // Validate password
    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
      // alert("Passwords do not match.");
      errorElement.textContent = "Passwords do not match.";
      return;
    }

    var data = new FormData(form);
    var jsonData = {};

    for (var [key, value] of data.entries()) {
      jsonData[key] = value;
    }

    fetch("http://localhost:8080/api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        // Handle the response from the backend
        if (response.ok) {
          window.location.href = "/index.html";
        }
        // Handle the error message from the backend
        errorElement.textContent = "Nin Already used to Create account.";
      })
      .catch((error) => {
        // Handle any errors
      });
  });
