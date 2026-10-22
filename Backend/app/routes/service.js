
const express = require('express');
const router = express.Router();

const servicesController = require('../controllers/services');

// GET all services
router.get('/', servicesController.getServices);

// GET service by ID
router.get('/:id', servicesController.getServiceById);

// POST new service
router.post('/', servicesController.addService);

// PUT update service
router.put('/:id', servicesController.updateService);

// DELETE service
router.delete('/:id', servicesController.deleteService);

module.exports = router;
