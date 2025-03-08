// 1) On DOM load, set min and max for the date input (18-55 age range)
document.addEventListener("DOMContentLoaded", function () {
  const dobInput = document.getElementById("dob");  // Fixed ID
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

// 2) Form and local storage setup
const userForm = document.getElementById("userForm");

function getEntries() {
  let stored = localStorage.getItem("user-entries");
  return stored ? JSON.parse(stored) : [];
}

let userEntries = getEntries();

// 3) Display entries in a table
function displayEntries() {
  const tableContainer = document.getElementById("user-entries");

  // Ensure the table structure exists before inserting rows
  const table = `
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Dob</th>
          <th>Accepted terms?</th>
        </tr>
      </thead>
      <tbody id="table-body">
      </tbody>
    </table>
  `;

  tableContainer.innerHTML = table; // Ensures the table is always present

  // Add rows from localStorage
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = userEntries.map(entry => `
        <tr>
          <td>${entry.name}</td>
          <td>${entry.email}</td>
          <td>${entry.password}</td>
          <td>${entry.dob}</td>
          <td>${entry.acceptTerms ? "Yes" : "No"}</td>
        </tr>
  `).join("");
}
// 4) Save new entry and enforce validation rules
function saveForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;  // Fixed ID
  const acceptTerms = document.getElementById("acceptTerms").checked;

  // Email regex pattern: Only lowercase, correct format
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  if (!emailPattern.test(email)) {
    alert("Invalid email format! Use only lowercase letters and a valid domain.");
    return;  // Stop form submission
  }

  // Age validation (18-55 years old)
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--; // Adjust age if birthday hasn't occurred yet this year
  }

  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55 years.");
    return; // Stop form submission
  }

  // Create a new entry object
  const entry = { name, email, password, dob, acceptTerms };

  // Add to array and update local storage
  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));

  // Update table and reset form
  displayEntries();
  userForm.reset();
}
// 5) Listen for form submission and load existing entries
userForm.addEventListener("submit", saveForm);
displayEntries();
