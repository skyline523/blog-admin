const { Tag } = require('../models/tag');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllTags = async (req, res) => {
  try {
    const features = new APIFeatures(Tag.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tags = await features.query;

    res.status(200).json({
      status: 'success',
      total: tags.length,
      list: tags,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id).select('-__v');

    if (!tag) {
      return res.status(404).json({
        status: 'fail',
        message: 'the tag with the given id was not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: tag,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createTag = async (req, res) => {
  try {
    const tag = new Tag(req.body);
    await tag.save();

    res.status(201).json({
      status: 'success',
      data: tag,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!tag) {
      return res.status(404).json({
        status: 'fail',
        message: 'the tag with the given id was not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: tag,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);

    if (!tag) {
      return res.status(404).json({
        status: 'fail',
        message: 'the tag with the given id was not found',
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
