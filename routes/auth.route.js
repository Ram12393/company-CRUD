const express = require('express');
const router = express.Router();
const user = require('../controllers/auth.controller');
const auth = require('../middleware/auth')

router.post('/login', user.login);
router.get('/me',auth ,user.currentUser);

module.exports = router