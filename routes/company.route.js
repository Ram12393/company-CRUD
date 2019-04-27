const express = require('express');
const router = express.Router();
const company = require('../controllers/company.controller');

router.post('/create-company', company.createCompany);
router.get('/all-companies', company.getCompanies);
router.put('/update-company/:id', company.updateCompany);
router.delete('/delete-company/:id', company.deleteCompany);

module.exports = router;