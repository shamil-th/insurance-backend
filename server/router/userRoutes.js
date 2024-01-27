const express = require('express');
const applicationRoute = express.Router();
const applicationController = require('../controller/applicationController');

applicationRoute.post('/application',applicationController.create);
applicationRoute.get('/application',applicationController.find);
applicationRoute.put('/application/:id',applicationController.update);

module.exports = applicationRoute
