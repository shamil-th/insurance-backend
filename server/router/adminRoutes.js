const express = require('express');
const adminRoute = express.Router();
const policyController = require('../controller/adminController');

adminRoute.post('/policy',policyController.create);

module.exports = adminRoute
