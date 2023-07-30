const form = document.getElementById("registrationForm");
const formSections = Array.from(form.getElementsByClassName("form-section"));
const steps = Array.from(document.getElementsByClassName("step"));
let currentStep = 0;

function showFormSection(index) {
  formSections.forEach((section, i) => {
    if (i === index) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

function updateStepper(index) {
  steps.forEach((step, i) => {
    if (i === index) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
}

function goToNextStep() {
  if (currentStep < formSections.length - 1) {
    currentStep++;
    showFormSection(currentStep);
    updateStepper(currentStep);
  }
}

function goToPreviousStep() {
  if (currentStep > 0) {
    currentStep--;
    showFormSection(currentStep);
    updateStepper(currentStep);
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // Handle form submission logic here
  console.log("Form submitted!");
});

document
  .getElementsByClassName("next")[0]
  .addEventListener("click", goToNextStep);
document
  .getElementsByClassName("previous")[0]
  .addEventListener("click", goToPreviousStep);
document
  .getElementsByClassName("next")[1]
  .addEventListener("click", goToNextStep);
document
  .getElementsByClassName("previous")[1]
  .addEventListener("click", goToPreviousStep);
document
  .getElementsByClassName("next")[2]
  .addEventListener("click", goToNextStep);
document
  .getElementsByClassName("previous")[2]
  .addEventListener("click", goToPreviousStep);

// Function to get the NIN from localStorage
function getNINFromLocalStorage() {
  return localStorage.getItem("nin");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    // Get the NIN from localStorage
    const nin = getNINFromLocalStorage();

    // Create an object to send the birth details
    const birthDetails = {
      childName: formData.get("childname"),
      birthDate: formData.get("dateofbirth"),
      gender: formData.get("gender"),
      placeOfBirth: formData.get("placeofbirth"),
      fatherName: formData.get("fathername"),
      motherName: formData.get("mothername"),
      lga: formData.get("lga"),
    };

    // Save the birthDetails object in the local storage as a JSON string
    localStorage.setItem("birthDetails", JSON.stringify(birthDetails));

    // Make the request to update the birth details using Fetch API
    fetch(`http://localhost:8080/api/v1/user/birth/${nin}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(birthDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating birth details");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data if needed
        console.log("Birth details updated:", data);
        alert("Your application has been successfully submitted.");
        window.location.href = "/dashboard.html";
      })
      .catch((error) => {
        console.error("Error:", error.message);
        // Handle the error, display an error message, etc.
      });
  });
});
