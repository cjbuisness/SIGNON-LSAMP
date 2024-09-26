document.getElementById('signInForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const studentId = document.getElementById('studentId').value;
  
    // Get the current time
    const currentTime = new Date().toLocaleString();
  
    // Prepare the data to send to the server
    const signInData = {
      name: name,
      studentId: studentId,
      time: currentTime
    };
  
    // Send the data to the server
    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signInData)
      });
  
      const statusMessage = document.getElementById('statusMessage');
      if (response.ok) {
        statusMessage.textContent = 'Sign-in successful!';
      } else {
        statusMessage.textContent = 'Sign-in failed. Please try again.';
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('statusMessage').textContent = 'Error occurred!';
    }
  
    // Clear the form
    document.getElementById('name').value = '';
    document.getElementById('studentId').value = '';
  });
  