const express = require('express');
const router = express.Router();
const company = require('../controllers/company.controller');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin')

router.post('/create-company', [auth,admin], company.createCompany);
router.get('/all-companies', company.getCompanies);
router.put('/update-company/:id', company.updateCompany);
router.delete('/delete-company/:id', company.deleteCompany);

module.exports = router;