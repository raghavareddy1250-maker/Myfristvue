
const app = require('./src/app');
const path = require('path');

const PORT = process.env.PORT || 3200;

// Serve Vue frontend files from the Server directory
const frontendPath = __dirname;

app.use(require('express').static(frontendPath));

// Start the Node.js server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
/*const app = require('./src/app');

const PORT = 3200;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
*/
