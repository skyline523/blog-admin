const express = require('express');

const linkController = require('../controllers/linkController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', linkController.getAllLinks);

router.get('/:id', linkController.getLink);

router.post(
  '/',
  authController.authToken,
  authController.restrictTo,
  linkController.createLink
);

router.patch(
  '/:id',
  authController.authToken,
  authController.restrictTo,
  linkController.updateLink
);

router.delete(
  '/:id',
  authController.authToken,
  authController.restrictTo,
  linkController.deleteLink
);

module.exports = router;
