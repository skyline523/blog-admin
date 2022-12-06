const { Post } = require('../models/post');
const { Category } = require('../models/category');
const { Tag } = require('../models/tag');
const APIFeatures = require('../utils/apiFeatures');

exports.getModules = async (req, res) => {
  try {
    const posts = await Post.count();
    const categories = await Category.count();
    const tags = await Tag.count();

    res.status(200).json({
      status: 'success',
      posts,
      categories,
      tags,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getPostTimeline = async (req, res) => {
  try {
    const features = new APIFeatures(Post.find().limit(5), req.query).sort();

    const posts = await features.query;

    res.status(200).json({
      status: 'success',
      list: posts,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getPostArchive = async (req, res) => {
  try {
    const archive = await Post.aggregate([
      {
        $project: {
          yearMonth: {
            $dateToString: {
              format: '%Y-%m',
              date: '$createdAt',
              timezone: '+08:00',
            },
          },
        },
      },
      {
        $group: {
          _id: '$yearMonth',
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      result: archive,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getCategoryArchive = async (req, res) => {
  try {
    const archive = await Category.aggregate([
      {
        $project: {
          name: 1,
          numberOfPosts: { $size: '$relatedPosts' },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      result: archive,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getTagArchive = async (req, res) => {
  try {
    const archive = await Tag.aggregate([
      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'tags',
          as: 'result',
        },
      },
      {
        $project: {
          name: 1,
          numberOfPosts: { $size: '$result' },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      result: archive,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
