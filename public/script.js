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

  // If validation passes, prepare data to send to the server
  const currentTime = new Date().toLocaleString();
  const signInData = {
    name: `${firstName} ${lastName}`,  // Combine first and last name
    studentId: studentId,
    time: currentTime
  };

  // Send data to the server
  fetch('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signInData)
  })
  .then(response => {
    if (response.ok) {
      // Set the success message with the first name included
      statusMessage.textContent = `Sign-in successful! Thank you, ${firstName}!`;
      
      // Clear input fields
      document.getElementById('firstName').value = '';
      document.getElementById('lastName').value = '';
      document.getElementById('studentId').value = '';

      // Hide the message after 8 seconds
      setTimeout(() => {
        statusMessage.textContent = ''; // Clear the message
      }, 3000);
    } else {
      statusMessage.textContent = 'Failed to sign in.';
    }
  })
  .catch(error => {
    console.error('Error:', error);
    statusMessage.textContent = 'Error submitting the form.';
  });
});
