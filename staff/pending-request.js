async function fetchBirthDetails() {
  let usersData = [];
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/registrar/view-birth"
    );
    const users = await response.json();

    const birthTable = document.getElementById("birthTable");
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
  } catch (error) {
    console.error("Error fetching data:", error);
  }
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
    console.log(data);
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
    console.log(data);
  } catch (error) {
    console.error("Error declining birth:", error);
  }
}
document.addEventListener("DOMContentLoaded", fetchBirthDetails);
