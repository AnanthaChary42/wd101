// Set min and max for the Date of Birth input (age range: 18-55)
document.addEventListener("DOMContentLoaded", function () {
  const dobInput = document.getElementById("dob");
  const today = new Date();
  const minAge = 18;
  const maxAge = 55;

  const minDate = new Date(
    today.getFullYear() - maxAge,
    today.getMonth(),
    today.getDate()
  ).toISOString().split("T")[0];

  const maxDate = new Date(
    today.getFullYear() - minAge,
    today.getMonth(),
    today.getDate()
  ).toISOString().split("T")[0];

  dobInput.setAttribute("min", minDate);
  dobInput.setAttribute("max", maxDate);
});

// Get form and manage localStorage entries
const userForm = document.getElementById("userForm");

function getEntries() {
  let stored = localStorage.getItem("user-entries");
  return stored ? JSON.parse(stored) : [];
}

let userEntries = getEntries();

// Display entries in a table
function displayEntries() {
  const tableRows = userEntries
    .map(entry => {
      return `
        <tr>
          <td>${entry.name}</td>
          <td>${entry.email}</td>
          <td>${entry.password}</td>
          <td>${entry.date}</td>
          <td>${entry.acceptTerms}</td>
        </tr>
      `;
    })
    .join("");

  const table = `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Dob</th>
          <th>Accepted terms?</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;

  document.getElementById("user-entries").innerHTML = table;
}

// Save form data and update table
function saveForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const date = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  const entry = { name, email, password, date, acceptTerms };
  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));

  displayEntries();
  userForm.reset();
}

userForm.addEventListener("submit", saveForm);
displayEntries();
