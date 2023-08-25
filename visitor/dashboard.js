const staffName = localStorage.getItem("staffName");
function searchBirthCertificate() {
  // Get the birth ID from the input field
  const birthid = document.getElementById("birthidInput").value;

  // Make an AJAX request to the /birth-by-id endpoint
  fetch(`http://localhost:8080/api/v1/user/birth-by-id?birthId=${birthid}`)
    .then((response) => {
      if (!response.ok) {
        // throw new Error("Birth certificate not found.");
        fetch(
          `http://localhost:8080/api/v1/user/death-by-id?deathId=${birthid}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Certificate not found.");
            }
            return response.json();
          })
          .then((data) => {
            // Update the certificate modal with the retrieved birth certificate details
            const certificateModal =
              document.getElementById("certificateModal");
            const certificateDetails =
              document.getElementById("certificateDetails");

            certificateDetails.innerHTML = `
              <p>Death Certificate found...</p>

              <h3>Registration Number:  <span>#${data.deathId}</span></h3>
              <h3>Name Of Applicant:  <span>${data.deathName}</span></h3>
              <h3>State Issued:  <span>Osun State</span></h3>
              <h3>Approved by :  <span>${staffName}</span></h3>
              <a href="/certificate/deceasedcertificate.html"><button>View Certificate</button></a>
            `;

            // Display the modal
            certificateModal.style.display = "block";
          })
          .catch((error) => {
            console.error(error);
            alert("Certificate not found.");
          });

        // ++++++++++++++++++++++++++++++++
      }
      return response.json();
    })
    .then((data) => {
      // Update the certificate modal with the retrieved birth certificate details
      const certificateModal = document.getElementById("certificateModal");
      const certificateDetails = document.getElementById("certificateDetails");

      certificateDetails.innerHTML = `
          <p>Birth Certificate found...</p>      
          <h3>Registration Number:  <span>#${data.birthId}</span></h3>
          <h3>Name Of Applicant:  <span>${data.childName}</span></h3>
          <h3>State Issued:  <span>Osun State</span></h3>
          <h3>Approved by :  <span>${staffName}</span></h3>
          <a href="/certificate/birthcertificate.html"><button>View Certificate</button></a>
        `;

      // Display the modal
      certificateModal.style.display = "block";
    });
}

function closeModal() {
  // Close the modal
  const certificateModal = document.getElementById("certificateModal");
  certificateModal.style.display = "none";
}

// Close the modal if the user clicks outside the modal content
window.onclick = function (event) {
  const certificateModal = document.getElementById("certificateModal");
  if (event.target === certificateModal) {
    closeModal();
  }
};
