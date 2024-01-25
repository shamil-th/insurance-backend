const express = require('express');
const applicationRoute = express.Router();
const applicationController = require('../controller/applicationController');

applicationRoute.post('/application',applicationController.create);
applicationRoute.get('/application',applicationController.find);

module.exports = applicationRoute
