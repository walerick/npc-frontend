var storedName = localStorage.getItem("name");
var spanElement = document.querySelector("span");
spanElement.textContent = storedName;

const trackProgressBtn = document.getElementById("trackProgressBtn");
const trackProgressModal = document.getElementById("trackProgressModal");
const checkBirthCertBtn = document.getElementById("checkBirthCertBtn");
const checkDeathCertBtn = document.getElementById("checkDeathCertBtn");
const checkAttestationBtn = document.getElementById("checkAttestationBtn");
const checkDeceasedCertBtn = document.getElementById("checkDeceasedCertBtn");

trackProgressBtn.addEventListener("click", async () => {
  trackProgressModal.style.display = "block";

  try {
    // Fetch the user data using the stored nin from localStorage
    const nin = localStorage.getItem("nin");
    const response = await fetch(
      `http://localhost:8080/api/v1/user/get-by-nin/${nin}`
    );
    const user = await response.json();

    // CHECK IF STATUS IS APPROVED
    if (user.birthStatus === "approved") {
      checkBirthCertBtn.disabled = false;
      checkBirthCertBtn.addEventListener("click", () => {
        window.location.href = "/certificate/birthcertificate.html";
      });
    } else {
      checkBirthCertBtn.disabled = true;
    }

    if (user.deathStatus === "approved") {
      checkDeceasedCertBtn.disabled = false;
      checkDeceasedCertBtn.addEventListener("click", () => {
        window.location.href = "/certificate/deceasedcertificate.html";
      });
    } else {
      checkDeceasedCertBtn.disabled = true;
    }

    if (user.attestByStaffStatus === "approved") {
      checkDeathCertBtn.disabled = false;
      checkDeathCertBtn.addEventListener("click", () => {
        window.location.href = "/certificate/age-attestation.html";
      });
    } else {
      checkDeathCertBtn.disabled = true;
    }

    if (user.attestationStatus === "approved") {
      checkAttestationBtn.disabled = false;
      checkAttestationBtn.addEventListener("click", () => {
        window.location.href = "/certificate/affidavit/affidavit.html";
      });
    } else {
      checkAttestationBtn.disabled = true;
    }

    if (user.birthStatus === "approved") {
      checkBirthCertBtn.disabled = false;
    } else {
      checkBirthCertBtn.disabled = true;
    }

    if (user.deathStatus === "approved") {
      checkDeceasedCertBtn.disabled = false;
    } else {
      checkDeceasedCertBtn.disabled = true;
    }

    if (user.attestByStaffStatus === "approved") {
      checkDeathCertBtn.disabled = false;
    } else {
      checkDeathCertBtn.disabled = true;
    }

    if (user.attestationStatus === "approved") {
      checkAttestationBtn.disabled = false;
    } else {
      checkAttestationBtn.disabled = true;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
  // OPT OUT OF MODAL CONTENT
  window.onclick = (event) => {
    if (event.target === trackProgressModal) {
      trackProgressModal.style.display = "none";
    }
  };
});
