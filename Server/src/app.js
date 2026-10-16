const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000','http://127.0.0.1:3000','http://127.0.0.1:5173','https://myvueproject-fahzgmaxf7h9cmfp.westus3-01.azurewebsites.net'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.options(/.*/, (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

app.use(express.json());

app.use('/api', authRoutes);

// Serve Vue frontend files from the Server folder
const frontendPath = path.resolve(__dirname, '..');

app.get('/', (req, res) => {
  console.log('Serving index.html from frontendPath:', frontendPath);
  res.sendFile(path.join(frontendPath, 'index.html'));
  //res.json({ message: 'Backend is running' });
});

module.exports = app;
