const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');

router.post('/sign-up', user.createUser);

module.exports = router