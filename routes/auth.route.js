const express = require('express');
const router = express.Router();
const user = require('../controllers/auth.controller');

router.post('/login', user.createUser);

module.exports = router