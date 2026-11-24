const express = require('express');

class ArticleRouter {
  constructor(articleController) {
    this.router = express.Router();
    this.articleController = articleController;

    this.configureRoutes();
  }

  configureRoutes() {
    this.router.get('/', this.articleController.getAllArticles);
    this.router.get('/articles', this.articleController.getAllArticles);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = ArticleRouter;
