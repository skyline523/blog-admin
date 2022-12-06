const express = require('express');

const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', postController.getAllPosts);

router.get('/:id', postController.getPost);

router.post(
  '/',
  authController.authToken,
  authController.restrictTo,
  postController.createPost
);

router.patch(
  '/:id',
  authController.authToken,
  authController.restrictTo,
  postController.updatePost
);

router.delete(
  '/:id',
  authController.authToken,
  authController.restrictTo,
  postController.deletePost
);

module.exports = router;
