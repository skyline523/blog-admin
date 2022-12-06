const express = require('express');

const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', categoryController.getAllCategories);

router.get('/:id', categoryController.getCategory);

router.post(
  '/',
  authController.authToken,
  authController.restrictTo,
  categoryController.createCategory
);

router.patch(
  '/:id',
  authController.authToken,
  authController.restrictTo,
  categoryController.updateCategory
);

router.delete(
  '/:id',
  authController.authToken,
  authController.restrictTo,
  categoryController.deleteCategory
);

module.exports = router;
