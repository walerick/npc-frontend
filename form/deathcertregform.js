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
    const deathDetails = {
      deathName: formData.get("childName"),
      dateAtDeath: formData.get("dod"),
      deathGender: formData.get("sex"),
      placeOfDeath: formData.get("address"),
      stateOfOrigin: formData.get("stateOfOrigin"),
      deathFather: formData.get("deathFather"),
      deathMother: formData.get("deathMother"),
    };

    // Save the birthDetails object in the local storage as a JSON string
    localStorage.setItem("birthDetails", JSON.stringify(deathDetails));

    // Make the request to update the birth details using Fetch API
    fetch(`http://localhost:8080/api/v1/user/death/${nin}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deathDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating death details");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data if needed
        console.log("Death details updated:", data);
        alert("Your application has been successfully submitted.");
        window.location.href = "/dashboard.html";
      })
      .catch((error) => {
        console.error("Error:", error.message);
        // Handle the error, display an error message, etc.
      });
  });
});
