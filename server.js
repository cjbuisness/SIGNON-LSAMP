const express = require('express');
const bodyParser = require('body-parser');
const { createObjectCsvWriter } = require('csv-writer');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static files from the 'public' folder

// CSV Writer
const csvWriter = createObjectCsvWriter({
  path: 'signins.csv',
  header: [
    { id: 'name', title: 'Name' },
    { id: 'studentId', title: 'Student ID' },
    { id: 'time', title: 'Sign-In Time' }
  ],
  append: true  // Append to the file if it already exists
});

// Handle form submissions
app.post('/signin', (req, res) => {
  const { name, studentId, time } = req.body;

  csvWriter.writeRecords([{ name, studentId, time }])
    .then(() => {
      res.status(200).send('Sign-in recorded.');
    })
    .catch(err => {
      console.error('Error writing to CSV:', err);
      res.status(500).send('Error recording sign-in.');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
