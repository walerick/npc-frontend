let usersData = [];

async function fetchBirthDetails() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/externalRegistrar/view-attestation"
    );
    usersData = await response.json();

    populateBirthTable(usersData);
    showPendingUsers();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function populateBirthTable(users) {
  const birthTable = document.getElementById("attestTable");
  birthTable.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");
    const ninCell = document.createElement("td");
    ninCell.textContent = user.attestid;
    const nameCell = document.createElement("td");
    nameCell.textContent = user.attestname;

    const birthdateCell = document.createElement("td");
    birthdateCell.textContent = user.attestlg;

    const fatherNameCell = document.createElement("td");
    fatherNameCell.textContent = user.nin;

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

    row.appendChild(actionsCell);

    birthTable.appendChild(row);
  });
}

async function approveBirth(nin) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/externalRegistrar/view-attest/approve/${nin}`,
      {
        method: "PUT",
      }
    );
    const data = await response.json();
    console.log(data);

    fetchBirthDetails();
  } catch (error) {
    console.error("Error approving birth:", error);
  }
}

async function declineBirth(nin) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/externalRegistrar/view-attest/decline/${nin}`,
      {
        method: "PUT",
      }
    );
    const data = await response.json();
    console.log(data);
    fetchBirthDetails();
  } catch (error) {
    console.error("Error declining birth:", error);
  }
}

function showApprovedUsers() {
  const approvedUsers = usersData.filter(
    (user) => user.attestationstatus === "approved"
  );
  populateBirthTable(approvedUsers);
}

function showDeclinedUsers() {
  const declinedUsers = usersData.filter(
    (user) => user.attestationstatus === "declined"
  );
  populateBirthTable(declinedUsers);
}

function showPendingUsers() {
  const pendingUsers = usersData.filter(
    (user) => user.attestationstatus === "pending"
  );
  populateBirthTable(pendingUsers);
}

document
  .getElementById("approved-btn")
  .addEventListener("click", showApprovedUsers);
document
  .getElementById("declined-btn")
  .addEventListener("click", showDeclinedUsers);
document
  .getElementById("pending-btn")
  .addEventListener("click", showPendingUsers);

document.addEventListener("DOMContentLoaded", fetchBirthDetails);
