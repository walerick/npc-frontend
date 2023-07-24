// Get the form element from the document
const form = document.querySelector(".birthcert");

// Define a function to save the input values in localStorage
function saveData(event) {
  // Prevent the default behavior of the form submission
  event.preventDefault();

  // Get the input elements from the form
  const childName = form.elements["child_name"];
  const dateOfBirth = form.elements["date_of_birth"];
  const gender = form.elements["gender"];

  // Save the input values in localStorage
  localStorage.setItem("child_name", childName.value);
  localStorage.setItem("date_of_birth", dateOfBirth.value);
  localStorage.setItem("gender", gender.value);

  // Display a message to the user
  alert("Your details have been sent to the Admin, Kindly wait for approval.");
}

// Attach the saveData() function to the submit event of the form
form.addEventListener("submit", saveData);
