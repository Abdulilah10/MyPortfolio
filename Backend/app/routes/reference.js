
const express = require('express');
const router = express.Router();

const referencesController = require('../controllers/reference');

// GET all references
router.get('/', referencesController.getReferences);

// GET reference by ID
router.get('/:id', referencesController.getReferenceById);

// POST new reference
router.post('/', referencesController.addReference);

// PUT update reference
router.put('/:id', referencesController.updateReference);

// DELETE reference
router.delete('/:id', referencesController.deleteReference);

module.exports = router;
