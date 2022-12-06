const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Link = mongoose.model('Link', linkSchema);

exports.linkSchema = linkSchema;
exports.Link = Link;
