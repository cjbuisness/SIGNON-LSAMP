document.getElementById('signinForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const studentId = document.getElementById('studentId').value.trim();
  const statusMessage = document.getElementById('statusMessage');

  // Clear previous status message
  statusMessage.textContent = '';

  // Validation Rules
  const namePattern = /^[A-Za-z]+$/;  // Only letters for first and last names
  const idPattern = /^\d{9}$/;        // 9 digit student ID

  // Validate first and last name (must be at least 2 letters)
  if (!namePattern.test(firstName) || firstName.length < 2) {
    statusMessage.textContent = 'First name must contain only letters and be at least 2 characters long.';
    return;
  }

  if (!namePattern.test(lastName) || lastName.length < 2) {
    statusMessage.textContent = 'Last name must contain only letters and be at least 2 characters long.';
    return;
  }

  // Validate student ID (exactly 9 digits)
  if (!idPattern.test(studentId)) {
    statusMessage.textContent = '*** Invalid studentId ***';
    return;
  }

  // If validation passes, append data to CSV file (mocked for offline use)
  const currentTime = new Date().toLocaleString();
  const signInData = `${firstName},${lastName},${studentId},${currentTime}\n`;

  // Use the server logic here to save to CSV file (mocking as a console log)
  console.log('Sign-in Data:', signInData);

  statusMessage.textContent = 'Sign-in successful!';

  // Clear input fields
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('studentId').value = '';
});
