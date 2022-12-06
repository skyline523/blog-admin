const { Category } = require('../models/category');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllCategories = async (req, res) => {
  try {
    const features = new APIFeatures(Category.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .population('relatedPosts');

    const categories = await features.query;

    res.status(200).json({
      status: 'success',
      total: categories.length,
      list: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      'relatedPosts'
    );

    if (!category) {
      return res.status(404).json({
        status: 'fail',
        message: 'the given id with the category was not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();

    res.status(201).json({
      status: 'success',
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!category) {
      return res.status(404).json({
        status: 'fail',
        message: 'the given id with the category was not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        status: 'fail',
        message: 'the category with the given id was not found',
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
