let usersData = [];

async function fetchRegistrarDetails() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/registrar/view-admin"
    );
    usersData = await response.json();
    populateRoleTable(usersData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchStaffDetails() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/registrar/view-staff"
    );
    usersData = await response.json();
    populateRoleTable(usersData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function populateRoleTable(users) {
  const roleTable = document.getElementById("roleTable");
  roleTable.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = user.id;
    const nameCell = document.createElement("td");
    nameCell.textContent = user.username;

    const passwordCell = document.createElement("td");
    passwordCell.textContent = user.password;

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteRegistrar(user.id));
    deleteCell.appendChild(deleteButton);

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(passwordCell);
    row.appendChild(deleteCell);

    roleTable.appendChild(row);
  });
}

// document.getElementById("npc-btn").addEventListener("click", fetchStaffDetails);

// document
//   .getElementById("registrar-btn")
//   .addEventListener("click", fetchRegistrarDetails);

// document
//   .getElementById("visitor-btn")
//   .addEventListener("click", fetchStaffDetails);

async function deleteRegistrar(id) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/registrar/delete-registrar/${id}`,
      {
        method: "DELETE",
      }
    );
    fetchRegistrarDetails();
  } catch (error) {
    console.error("Error deletin account:", error);
  }
}

document.getElementById("role").addEventListener("change", function () {
  const selectedRole = this.value;

  if (selectedRole === "npc") {
    fetchStaffDetails();
  } else if (selectedRole === "registrar") {
    fetchRegistrarDetails();
  } else if (selectedRole === "visitor") {
    fetchStaffDetails();
  }
});

document.addEventListener("DOMContentLoaded", fetchStaffDetails);
