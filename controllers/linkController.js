const { Link } = require('../models/link');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllLinks = async (req, res) => {
  try {
    const features = new APIFeatures(Link.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const links = await features.query;

    res.status(200).json({
      status: 'success',
      total: links.length,
      list: links,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id).select('-__v');

    if (!link) {
      return res.status(404).json({
        status: 'fail',
        message: 'the link with the given id was not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: link,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createLink = async (req, res) => {
  try {
    const link = new Link(req.body);
    link.save();

    res.status(201).json({
      status: 'success',
      data: link,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateLink = async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!link) {
      return res.status(404).json({
        status: 'fail',
        message: 'the link with the given id was not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: link,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteLink = async (req, res) => {
  try {
    const link = await Link.findByIdAndDelete(req.params.id);

    if (!link) {
      return res.status(404).json({
        status: 'fail',
        message: 'the link with the given id was not found',
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
