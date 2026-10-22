
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user');

// GET all users
router.get('/', usersController.getUsers);

// GET user by ID
router.get('/:id', usersController.getUserById);

// POST new user
router.post('/', usersController.addUser);

// PUT update user by ID
router.put('/:id', usersController.updateUser);

// DELETE user by ID
router.delete('/:id', usersController.deleteUser);

module.exports = router;
