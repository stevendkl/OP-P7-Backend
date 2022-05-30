// Import express
const express = require('express');
const router = express.Router();

// Import middleware
const auth = require('../middleware/auth');

// Import user controller
const userCtrl = require('../controllers/user');

// Set user routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete', auth, userCtrl.delete);

module.exports = router;