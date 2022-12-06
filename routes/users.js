const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUser);

// router.post('/', userController.createUser);

// router.patch('/:id', userController.updateUser);

// router.delete('/:id', userController.deleteUser);

module.exports = router;
