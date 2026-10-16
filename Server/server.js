
const app = require('./src/app');
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3200;

// Vue build files are in /home/site/wwwroot/Server
const frontendPath = __dirname;

// Serve index.html, favicon.ico, assets, and other static files
app.use(express.static(frontendPath));

// Serve Vue index.html for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});


/*const app = require('./src/app');

const PORT = 3200;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
*/
