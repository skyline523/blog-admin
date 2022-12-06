const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '文章的标题不能为空'],
      minlength: [5, '文章的标题长度需大于等于5个字符'],
      maxlength: [30, '文章的标题长度需小于等于30个字符'],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, '文章须关联一个分类'],
    },
    tags: {
      type: [mongoose.Schema.ObjectId],
      ref: 'Tag',
      required: [true, '文章至少关联一个标签'],
    },
    cover_image: {
      type: String,
      required: [true, '文章的封面图片不能为空'],
    },
    description: {
      type: String,
      required: [true, '文章的简介不能为空'],
    },
    content: {
      type: String,
      required: [true, '文章的内容不能为空'],
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

exports.postSchema = postSchema;
exports.Post = Post;
