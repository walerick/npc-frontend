// Function to get the NIN from localStorage
function getNINFromLocalStorage() {
  return localStorage.getItem("nin");
}

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
            <h2>Registration Number: <span>#${data.attestid}</span></h2>
            <div class="row">
              <div class="column">
                <h3>Name:</h3>
                <p>${data.attestname}</p>
              </div>
              <div class="column">
                <h3>Date of Birth:</h3>
                <p>${data.attestdate}</p>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <h3>Age:</h3>
                <p>${data.attestage}</p>
              </div>            
              <div class="column">
                <h3>Local Govt Area:</h3>
                <p>${data.attestlg}</p>
              </div>
            </div>
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
