// Import express
const express = require('express');
const router = express.Router();

// Import middleware
const auth = require('../middleware/auth');

// Import sauce controller
const postreadCtrl = require('../controllers/postread');

// Set sauce routes
router.get('/', auth, postreadCtrl.getAllRead);
router.post('/', auth, postreadCtrl.createRead);
router.get('/:id', auth, postreadCtrl.getUnRead);

module.exports = router;