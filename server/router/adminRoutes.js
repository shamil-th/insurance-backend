const express = require('express');
const adminRoute = express.Router();
const policyController = require('../controller/adminController');

// adminRoute.post('/policy',policyController.create);
adminRoute.get('/policy',policyController.find);

module.exports = adminRoute
