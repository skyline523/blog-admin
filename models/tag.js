const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '标签名不能为空'],
    },
    remark: {
      type: String,
    },
  },
  { timestamps: true }
);

const Tag = mongoose.model('Tag', tagSchema);

exports.tagSchema = tagSchema;
exports.Tag = Tag;
