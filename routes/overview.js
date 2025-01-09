const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Protected route for overview
router.get('/', auth(['user', 'admin']), (req, res) => {
  res.send({ message: 'Welcome to the overview page!' });
});

module.exports = router;