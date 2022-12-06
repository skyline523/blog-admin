const express = require('express');

const tagController = require('../controllers/tagController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', tagController.getAllTags);

router.get('/:id', tagController.getTag);

router.post(
  '/',
  authController.authToken,
  authController.restrictTo,
  tagController.createTag
);

router.patch(
  '/:id',
  authController.authToken,
  authController.restrictTo,
  tagController.updateTag
);

router.delete(
  '/:id',
  authController.authToken,
  authController.restrictTo,
  tagController.deleteTag
);

module.exports = router;
