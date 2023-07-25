let usersData = []; // Store the fetched users data

async function fetchBirthDetails() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/registrar/view-birth"
    );
    usersData = await response.json(); // Store the fetched users data

    // Call the function to populate the table with all users
    populateBirthTable(usersData);
    showPendingUsers();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function populateBirthTable(users) {
  const birthTable = document.getElementById("birthTable");
  birthTable.innerHTML = ""; // Clear the table

  users.forEach((user) => {
    const row = document.createElement("tr");
    const ninCell = document.createElement("td");
    ninCell.textContent = user.nin;
    const nameCell = document.createElement("td");
    nameCell.textContent = user.childname;

    const birthdateCell = document.createElement("td");
    birthdateCell.textContent = user.birthdate;

    const fatherNameCell = document.createElement("td");
    fatherNameCell.textContent = user.fathername;

    const motherNameCell = document.createElement("td");
    motherNameCell.textContent = user.mothername;

    const actionsCell = document.createElement("td");
    const acceptButton = document.createElement("button");
    acceptButton.textContent = "Accept";
    acceptButton.addEventListener("click", () => approveBirth(user.nin));
    const declineButton = document.createElement("button");
    declineButton.textContent = "Decline";
    declineButton.addEventListener("click", () => declineBirth(user.nin));

    actionsCell.appendChild(acceptButton);
    actionsCell.appendChild(declineButton);

    row.appendChild(ninCell);
    row.appendChild(nameCell);
    row.appendChild(birthdateCell);
    row.appendChild(fatherNameCell);
    row.appendChild(motherNameCell);
    row.appendChild(actionsCell);

    birthTable.appendChild(row);
  });
}

async function approveBirth(nin) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/registrar/view-birth/approve/${nin}`,
      {
        method: "PUT",
      }
    );
    const data = await response.json();
    console.log(data); // Optional: Log the response data (Success message)

    // After approval, re-fetch the data and re-populate the table
    fetchBirthDetails();
  } catch (error) {
    console.error("Error approving birth:", error);
  }
}

async function declineBirth(nin) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/registrar/view-birth/decline/${nin}`,
      {
        method: "PUT",
      }
    );
    const data = await response.json();
    console.log(data); // Optional: Log the response data (Success message)

    // After decline, re-fetch the data and re-populate the table
    fetchBirthDetails();
  } catch (error) {
    console.error("Error declining birth:", error);
  }
}

// Function to filter and show only users with "birthstatus" as "approved"
function showApprovedUsers() {
  const approvedUsers = usersData.filter(
    (user) => user.birthstatus === "approved"
  );
  populateBirthTable(approvedUsers);
}

// Function to filter and show only users with "birthstatus" as "declined"
function showDeclinedUsers() {
  const declinedUsers = usersData.filter(
    (user) => user.birthstatus === "declined"
  );
  populateBirthTable(declinedUsers);
}

// Function to filter and show only users with "birthstatus" as "pending"
function showPendingUsers() {
  const pendingUsers = usersData.filter(
    (user) => user.birthstatus === "pending"
  );
  populateBirthTable(pendingUsers);
}

// Add event listeners to the filter buttons
document
  .getElementById("approved-btn")
  .addEventListener("click", showApprovedUsers);
document
  .getElementById("declined-btn")
  .addEventListener("click", showDeclinedUsers);
document
  .getElementById("pending-btn")
  .addEventListener("click", showPendingUsers);

// Call the function to fetch and populate data when the page loads
document.addEventListener("DOMContentLoaded", fetchBirthDetails);
