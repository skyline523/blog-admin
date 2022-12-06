const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '分类名不能为空'],
    },
    relatedPosts: {
      type: [mongoose.Schema.ObjectId],
      ref: 'Post',
    },
    remark: String,
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

exports.categorySchema = categorySchema;
exports.Category = Category;
