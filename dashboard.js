// Retrieve the name from localStorage
var storedName = localStorage.getItem("name");

// Find the <span> element by its tag name
var spanElement = document.querySelector("span");

// Update the content of the <span> element with the stored name
spanElement.textContent = storedName;

const trackProgressBtn = document.getElementById("trackProgressBtn");
const trackProgressModal = document.getElementById("trackProgressModal");
const checkBirthCertBtn = document.getElementById("checkBirthCertBtn");
const checkDeathCertBtn = document.getElementById("checkDeathCertBtn");
const checkAttestationBtn = document.getElementById("checkAttestationBtn");

trackProgressBtn.addEventListener("click", async () => {
  trackProgressModal.style.display = "block";

  try {
    // Fetch the user data using the stored nin from localStorage
    const nin = localStorage.getItem("nin");
    const response = await fetch(
      `http://localhost:8080/api/v1/user/get-by-nin/${nin}`
    );
    const user = await response.json();

    // Check if the user data contains the necessary fields for each certificate type
    if (user.birthstatus === "approved") {
      checkBirthCertBtn.disabled = false;
      checkBirthCertBtn.addEventListener("click", () => {
        window.location.href = "/certificate/birthcertificate.html";
      });
    } else {
      checkBirthCertBtn.disabled = true;
    }

    if (user.deathstatus === "approved") {
      checkDeathCertBtn.disabled = false;
    } else {
      checkDeathCertBtn.disabled = true;
    }

    if (user.attestationstatus === "approved") {
      checkAttestationBtn.disabled = false;
    } else {
      checkAttestationBtn.disabled = true;
    }

    if (user.birthstatus === "approved") {
      checkBirthCertBtn.disabled = false;
    } else {
      checkBirthCertBtn.disabled = true;
    }

    if (user.deathstatus === "approved") {
      checkDeathCertBtn.disabled = false;
    } else {
      checkDeathCertBtn.disabled = true;
    }

    if (user.attestationstatus === "approved") {
      checkAttestationBtn.disabled = false;
    } else {
      checkAttestationBtn.disabled = true;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  // Close the modal when clicking anywhere outside of it
  window.onclick = (event) => {
    if (event.target === trackProgressModal) {
      trackProgressModal.style.display = "none";
    }
  };
});
