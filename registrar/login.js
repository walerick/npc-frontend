// login.js

localStorage.setItem("registrarUsername", "immigration");
localStorage.setItem("registrarPassword", "password");

// Function to retrieve a value from local storage
function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

// Function to verify the user credentials
function verifyUser(username, password) {
  const registrarUsername = getFromLocalStorage("registrarUsername");
  const registrarPassword = getFromLocalStorage("registrarPassword");

  if (username === registrarUsername && password === registrarPassword) {
    // Credentials are correct, proceed with login
    // For now, let's just show a success message
    window.location.href = "/registrar/dashboard.html";
  } else {
    // Credentials are incorrect, show an error message
    document.getElementById("error-message").innerText =
      "Invalid username or password.";
  }
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  const form = event.target;
  const username = form.username.value;
  const password = form.password.value;

  verifyUser(username, password);
}

// Listen for form submission event
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", handleFormSubmit);
