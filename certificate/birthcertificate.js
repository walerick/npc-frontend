// Function to get the NIN from localStorage
// checking git
function getNINFromLocalStorage() {
  return localStorage.getItem("nin");
}

const staffName = localStorage.getItem("staffName");

// Function to fetch and display birth details
function displayBirthDetails() {
  const nin = getNINFromLocalStorage();

  // Make the request to get the birth details
  fetch(`http://localhost:8080/api/v1/user/birth-details?nin=${nin}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching birth details");
      }
      return response.json();
    })
    .then((data) => {
      const certificateDetails = document.getElementById("certificateDetails");
      certificateDetails.innerHTML = `
          <h2>Registration Number: <span>#${data.birthId.toUpperCase()}</span></h2>
          <div class="row">
            <div class="column">
              <h3>Name:</h3>
              <p>${data.childName.toUpperCase()}</p>
            </div>
            <div class="column">
              <h3>Date of Birth:</h3>
              <p>${data.birthDate}</p>
            </div>
          </div>
          <div class="row">
            <div class="column">
              <h3>Place of Birth:</h3>
              <p>${data.placeOfBirth.toUpperCase()}</p>
            </div>
            <div class="column">
              <h3>Gender:</h3>
              <p>${data.gender.toUpperCase()}</p>
            </div>
          </div>

          <div class="row">
            <div class="column">
              <h3>Father's Name:</h3>
              <p>${data.fatherName.toUpperCase()}</p>
            </div>
            <div class="column">
              <h3>Mother's Name:</h3>
              <p>${data.motherName.toUpperCase()}</p>
            </div>
          </div>          

          <div class="row">
            <div class="column">
              <h3>State Of Origin:</h3>
              <p>${data.stateOfOrigin.toUpperCase()}</p>
            </div>
          </div>

          <div class="row">
            <div class="column">
              <h3></h3>
              <p></p>
            </div>          
            <div class="column" id="stamp">
              <br>
              <h3>Signed by:</h3>
              <p>${staffName.toLocaleUpperCase()}</p>
            </div>
          </div
        `;
    })
    .catch((error) => {
      console.error("Error:", error.message);
      // Handle the error, display an error message, etc.
    });
}

// Call the function to display birth details when the page loads
document.addEventListener("DOMContentLoaded", () => {
  displayBirthDetails();
});
