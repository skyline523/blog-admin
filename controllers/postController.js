const { Post } = require('../models/post');
const { Category } = require('../models/category');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllPosts = async (req, res) => {
  try {
    const features = new APIFeatures(Post.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .population('tags')
      .population('category');

    const posts = await features.query;

    res.status(200).json({
      status: 'success',
      total: posts.length,
      list: posts,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('tags')
      .populate('category')
      .select('-__v');

    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'the post with the given id was not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    const category = await Category.findByIdAndUpdate(
      req.body.category,
      { $push: { relatedPosts: post._id } },
      { new: true }
    );

    if (!category) {
      return res.status(400).json({
        status: 'fail',
        message: 'related category id is invalid.',
      });
    }

    await post.save();

    res.status(201).json({
      status: 'success',
      data: {
        post,
        category,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'the post with the given id was not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'the post with the given id was not found',
      });
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
