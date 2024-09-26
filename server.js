const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 3000;

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Handle POST requests to /signin
  if (req.method === 'POST' && req.url === '/signin') {
    let body = '';

    // Collect request data
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const signInData = JSON.parse(body);
      const { name, studentId, time } = signInData;

      // Create CSV format
      const csvRow = `${name},${studentId},${time}\n`;

      // Write to CSV
      fs.appendFile('signins.csv', csvRow, err => {
        if (err) {
          console.error('Error writing to CSV:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error recording sign-in.');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Sign-in recorded.');
        }
      });
    });
  } else if (req.method === 'GET') {
    // Serve static files from the 'public' folder
    const parsedUrl = url.parse(req.url);
    const filePath = `public${parsedUrl.pathname}`;
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found.');
      } else {
        res.writeHead(200);
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found.');
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
