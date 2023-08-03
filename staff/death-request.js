let usersData = [];

async function fetchDeathDetails() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/registrar/view-death"
    );
    usersData = await response.json();

    populateDeathTable(usersData);
    showPendingUsers();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function populateDeathTable(users) {
  const deathTable = document.getElementById("deathTable");
  deathTable.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");
    const ninCell = document.createElement("td");
    ninCell.textContent = user.nin;
    const nameCell = document.createElement("td");
    nameCell.textContent = user.deathName;

    const genderCell = document.createElement("td");
    genderCell.textContent = user.deathGender;

    const deathdateCell = document.createElement("td");
    deathdateCell.textContent = user.dateAtDeath;

    const placeOfDeathCell = document.createElement("td");
    placeOfDeathCell.textContent = user.placeOfDeath;

    const actionsCell = document.createElement("td");
    const acceptButton = document.createElement("button");
    acceptButton.textContent = "Accept";
    acceptButton.addEventListener("click", () => approveDeath(user.nin));
    const declineButton = document.createElement("button");
    declineButton.textContent = "Decline";
    declineButton.addEventListener("click", () => declineDeath(user.nin));

    actionsCell.appendChild(acceptButton);
    actionsCell.appendChild(declineButton);

    row.appendChild(ninCell);
    row.appendChild(nameCell);
    row.appendChild(genderCell);
    row.appendChild(deathdateCell);
    row.appendChild(placeOfDeathCell);
    row.appendChild(actionsCell);

    deathTable.appendChild(row);
  });
}

async function approveDeath(nin) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/registrar/view-death/approve/${nin}`,
      {
        method: "PUT",
      }
    );
    const data = await response.json();
    console.log(data);

    fetchDeathDetails();
  } catch (error) {
    console.error("Error approving death:", error);
  }
}

async function declineDeath(nin) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/registrar/view-death/decline/${nin}`,
      {
        method: "PUT",
      }
    );
    const data = await response.json();
    console.log(data);
    fetchDeathDetails();
  } catch (error) {
    console.error("Error declining death:", error);
  }
}

function showApprovedUsers() {
  const approvedUsers = usersData.filter(
    (user) => user.deathStatus === "approved"
  );
  populateDeathTable(approvedUsers);
}

function showDeclinedUsers() {
  const declinedUsers = usersData.filter(
    (user) => user.deathStatus === "declined"
  );
  populateDeathTable(declinedUsers);
}

function showPendingUsers() {
  const pendingUsers = usersData.filter(
    (user) => user.deathStatus === "pending"
  );
  populateDeathTable(pendingUsers);
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

document.addEventListener("DOMContentLoaded", fetchDeathDetails);
