let usersData = [];

async function fetchAttestDetails() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/externalRegistrar/view-attestation"
    );
    usersData = await response.json();

    populateAttestTable(usersData);
    showPendingUsers();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function populateAttestTable(users) {
  const attestTable = document.getElementById("attestTable");
  attestTable.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");
    const ninCell = document.createElement("td");
    ninCell.textContent = user.nin;

    const idCell = document.createElement("td");
    idCell.textContent = user.attestId;

    const nameCell = document.createElement("td");
    nameCell.textContent = user.attestName;

    const birthdateCell = document.createElement("td");
    birthdateCell.textContent = user.attestDate;

    const addressCell = document.createElement("td");
    addressCell.textContent = user.attestLg;

    const actionsCell = document.createElement("td");
    const acceptButton = document.createElement("button");
    acceptButton.textContent = "Accept";
    acceptButton.addEventListener("click", () => approveAttest(user.nin));
    const declineButton = document.createElement("button");
    declineButton.textContent = "Decline";
    declineButton.addEventListener("click", () => declineAttest(user.nin));

    actionsCell.appendChild(acceptButton);
    actionsCell.appendChild(declineButton);

    row.appendChild(ninCell);
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(birthdateCell);
    row.appendChild(addressCell);
    row.appendChild(actionsCell);

    attestTable.appendChild(row);
  });
}

async function approveAttest(nin) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/externalRegistrar/view-attestation/approve/${nin}`,
      {
        method: "PUT",
      }
    );
    const data = await response.json();
    console.log(data);

    fetchAttestDetails();
  } catch (error) {
    console.error("Error approving attestation:", error);
  }
}

async function declineAttest(nin) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/externalRegistrar/view-attestation/decline/${nin}`,
      {
        method: "PUT",
      }
    );
    const data = await response.json();
    console.log(data);
    fetchAttestDetails();
  } catch (error) {
    console.error("Error declining attestation:", error);
  }
}

function showApprovedUsers() {
  const approvedUsers = usersData.filter(
    (user) => user.attestationStatus === "approved"
  );
  populateAttestTable(approvedUsers);
}

function showDeclinedUsers() {
  const declinedUsers = usersData.filter(
    (user) => user.attestationStatus === "declined"
  );
  populateAttestTable(declinedUsers);
}

function showPendingUsers() {
  const pendingUsers = usersData.filter(
    (user) => user.attestationStatus === "pending"
  );
  populateAttestTable(pendingUsers);
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

document.addEventListener("DOMContentLoaded", fetchAttestDetails);
