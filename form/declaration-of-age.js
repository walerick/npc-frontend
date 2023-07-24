const form = document.getElementById("attestationForm");
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
// document
//   .getElementsByClassName("next")[2]
//   .addEventListener("click", goToNextStep);
// document
//   .getElementsByClassName("previous")[2]
//   .addEventListener("click", goToPreviousStep);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("attestationForm");

  // Step 1: Add an event listener to the form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Step 2: Retrieve the "nin" from localStorage
    const nin = localStorage.getItem("nin");

    // Step 3: Extract data from the form
    const childname = document.getElementById("childname").value;
    const dateofbirth = document.getElementById("dateofbirth").value;
    const placeofbirth = document.getElementById("placeofbirth").value;
    const age = document.getElementById("age").value;
    // const mothername = document.getElementById("mothername").value;
    // const motherAddress = document.getElementById("motherAddress").value;
    // const stateOfOrigin = document.getElementById("stateOfOrigin").value;
    // const lga = document.getElementById("select").value;
    // const fathername = document.getElementById("fathername").value;
    // const fatherAddress = document.getElementById("fatherAddress").value;
    // const fatherAge = document.getElementById("fatherAge").value;

    // Step 4: Create the AttestationRequest object
    const attestRequest = {
      attest_name: childname,
      attest_date: dateofbirth,
      attest_age: age,
      attest_lg: placeofbirth,
    };

    // Step 5: Make the API request to update attest details
    fetch(`http://localhost:8080/api/v1/attest/${nin}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attestRequest),
    })
      .then((response) => response.json())
      .then((data) => {
        // Step 6: Handle the response data if necessary
        console.log("Updated User Data:", data);
        // You can perform further actions or show success messages here
      })
      .catch((error) => {
        console.error("Error updating attest details:", error);
        // Handle errors here, show error messages, etc.
      });
  });
});
