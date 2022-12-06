const express = require('express');

const statsController = require('../controllers/statsController');

const router = express.Router();

// 统计每个集合的文档数
router.get('/modules', statsController.getModules);

router.get('/timeline/posts', statsController.getPostTimeline);

// 按文章的年月统计文章数量
router.get('/archive/post', statsController.getPostArchive);

// 查询每个分类关联的文章数
router.get('/archive/category', statsController.getCategoryArchive);

// 查询每个标签关联的文章数
router.get('/archive/tag', statsController.getTagArchive);

module.exports = router;
