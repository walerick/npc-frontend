document
  .querySelector(".register-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var form = event.target;
    var nameInput = form.elements.name;
    var passwordInput = form.elements.password;
    var confirmPasswordInput = form.elements["confirm-password"];
    var ninInput = form.elements.nin;

    // Validate password
    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
      // alert("Passwords do not match.");
      var errorElement = document.getElementById("error-message");
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
        window.location.href = "/index.html";
      })
      .catch((error) => {
        // Handle any errors
      });
  });
