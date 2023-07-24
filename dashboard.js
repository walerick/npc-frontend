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
  const approveValue = localStorage.getItem("approve");

  // Check if the "approve" value is 1
  if (approveValue === "1") {
    // Update the h2 tag text
    document.getElementById("progressHeading").innerText =
      "Congrats, Your application has been approved.";

    // Enable the buttons
    document.getElementById("checkBirthCertBtn").disabled = false;
    document.getElementById("checkDeathCertBtn").disabled = false;
    document.getElementById("checkAttestationBtn").disabled = false;
  }
});
