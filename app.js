// Import express
const express = require('express');
// Import path
const path = require('path');

require('./config/config')

require('./models/user')

// Import user routes
const userRoutes = require('./routes/user');
// Import sauce routes
const sauceRoutes = require('./routes/sauce');
// Import post read status routes
const postreadRoutes = require('./routes/postread');

const app = express();

app.use(express.json());

// Add middleware before API route to allow requests from all origins to access
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Set image storage folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// Set Api routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/postread', postreadRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;