'use strict';

const express = require('express');
const router = express.Router();
const articleAdminController = require('../../controllers/admin/articles');

router.post('/create', articleAdminController.createArticle);
router.get('/edit/:id', articleAdminController.getArticleForEdit);
router.post('/edit/:id', articleAdminController.updateArticle);
router.delete('/delete/:id', articleAdminController.deleteArticle);

module.exports = router;
