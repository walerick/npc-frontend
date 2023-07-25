// Get the input values in localStorage
localStorage.getItem("name", name.value);
// localStorage.getItem("date_of_birth", dateOfBirth.value);
// localStorage.getItem("gender", gender.value);
localStorage.setItem("approveBirthCert", "0");

const trackProgressBtn = document.getElementById("pendingBirth");
const trackProgressModal = document.getElementById("modal");

trackProgressBtn.addEventListener("click", () => {
  trackProgressModal.style.display = "block";
});

// Close the modal when the user clicks outside of it
window.onclick = (event) => {
  if (event.target === trackProgressModal) {
    trackProgressModal.style.display = "none";
  }
};

// Function to handle the click event of the "Approve" button
function handleApproveClick() {
  localStorage.setItem("approveBirthCert", "1");
  alert("You have approved the data.");
}

// Function to handle the click event of the "Decline" button
function handleDeclineClick() {
  localStorage.setItem("approveBirthCert", "0");
  alert("You have declined the data.");
}

// Add event listeners to the buttons
// document.addEventListener("DOMContentLoaded", setDefaultValue);
const approveBtn = document.querySelector(".approve-btn");
const declineBtn = document.querySelector(".decline-btn");
approveBtn.addEventListener("click", handleApproveClick);
declineBtn.addEventListener("click", handleDeclineClick);
