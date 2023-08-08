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

    // Step 4: Create the AttestationRequest object
    const attestRequest = {
      attestName: childname,
      attestDate: dateofbirth,
      attestLg: placeofbirth,
    };

    // Step 2: Extract data from the form
    const mothername = document.getElementById("mothername").value;
    const motherState = document.getElementById("motherState").value;
    const motherLga = document.getElementById("motherLga").value;
    const fathername = document.getElementById("fathername").value;
    const fatherState = document.getElementById("fatherState").value;
    const fatherLga = document.getElementById("fatherLga").value;

    // Step 3: Create an object to store all the data
    const formData = {
      childname,
      dateofbirth,
      placeofbirth,
      nin,
      mothername,
      motherState,
      motherLga,
      fathername,
      fatherState,
      fatherLga,
    };

    // Step 4: Store the form data in localStorage
    localStorage.setItem("formData", JSON.stringify(formData));

    // Step 5: Make the API request to update attest details
    fetch(`http://localhost:8080/api/v1/user/attest/${nin}`, {
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
        // Save the `attest_id` in localStorage
        const attestId = data.attestId;
        localStorage.setItem("attestId", attestId);
        window.location.href = "/dashboard.html";

        // You can perform further actions or show success messages here
      })
      .catch((error) => {
        console.error("Error updating attest details:", error);
        // Handle errors here, show error messages, etc.
      });

    // Step 7: Store the NIN value in localStorage
    const ninInput = document.getElementById("nin");
    const ninValue = ninInput.value;
    localStorage.setItem("nin", ninValue);
  });
});
