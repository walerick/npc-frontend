// Retrieve the name from localStorage
var storedName = localStorage.getItem("name");

// Find the <span> element by its tag name
var spanElement = document.querySelector("span");

// Update the content of the <span> element with the stored name
spanElement.textContent = storedName;

const trackProgressBtn = document.getElementById("trackProgressBtn");
const trackProgressModal = document.getElementById("trackProgressModal");

trackProgressBtn.addEventListener("click", () => {
  trackProgressModal.style.display = "block";
});

// Close the modal when the user clicks outside of it
window.onclick = (event) => {
  if (event.target === trackProgressModal) {
    trackProgressModal.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", function () {
  // Get the value of "approve" from local storage
  const approveBirthCert = localStorage.getItem("approveBirthCert");

  // Check if the "approve" value is 1
  if (approveBirthCert === "1") {
    // Update the h2 tag text
    document.getElementById("progressHeading").innerText =
      "Congrats, Your Birth Certificate application has been approved.";

    // Enable the buttons
    document.getElementById("checkBirthCertBtn").disabled = false;
    // document.getElementById("checkDeathCertBtn").disabled = false;
    // document.getElementById("checkAttestationBtn").disabled = false;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the value of "approve" from local storage
  const approveAttestion = localStorage.getItem("letterIssue");

  // Check if the "approve" value is 1
  if (approveAttestion === "1") {
    // Update the h2 tag text
    document.getElementById("progressHeading").innerText =
      "Your Affidavit letter has been issued by the Registrar.";

    // Enable the buttons
    // document.getElementById("checkBirthCertBtn").disabled = false;
    // document.getElementById("checkDeathCertBtn").disabled = false;
    document.getElementById("checkAttestationBtn").disabled = false;
  }
});
