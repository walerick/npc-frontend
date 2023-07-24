function searchBirthCertificate() {
  // Get the birth ID from the input field
  const birthid = document.getElementById("birthidInput").value;

  // Make an AJAX request to the /birth-by-id endpoint
  fetch(`http://localhost:8080/api/v1/user/birth-by-id?birthid=${birthid}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Birth certificate not found.");
      }
      return response.json();
    })
    .then((data) => {
      // Update the certificate modal with the retrieved birth certificate details
      const certificateModal = document.getElementById("certificateModal");
      const certificateDetails = document.getElementById("certificateDetails");

      certificateDetails.innerHTML = `
          <h2>Registration Number: <span>#${data.birthid}</span></h2>
          <div class="row">
            <div class="column">
              <h3>Name:</h3>
              <p>${data.childname}</p>
            </div>
            <div class="column">
              <h3>Date of Birth:</h3>
              <p>${data.birthdate}</p>
            </div>
          </div>
          <div class="row">
            <div class="column">
              <h3>Place of Birth:</h3>
              <p>${data.placeofbirth}</p>
            </div>
            <div class="column">
              <h3>Gender:</h3>
              <p>${data.gender}</p>
            </div>
          </div>
          <div class="row">
            <div class="column">
              <h3>Father's Name:</h3>
              <p>${data.fathername}</p>
            </div>
            <div class="column">
              <h3>Mother's Name:</h3>
              <p>${data.mothername}</p>
            </div>
          </div>
        `;

      // Display the modal
      certificateModal.style.display = "block";
    })
    .catch((error) => {
      console.error(error);
      alert("Birth certificate not found.");
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
