const express = require('express');

const ArticleRepository = require('./repositories/ArticleRepository');
const ArticleService = require('./services/ArticleService');
const ArticleController = require('./controllers/ArticleController');
const ArticleRouter = require('./routes/ArticleRouter');

class Application {
  constructor(database) {
    this.database = database;
    this.app = express();

    this.configureMiddleware();
    this.configureRoutes();
  }

  configureMiddleware() {
    this.app.use(express.json());

    this.app.use(
      express.urlencoded({
        extended: true,
      }),
    );
  }

  configureRoutes() {
    const articleRepository = new ArticleRepository(this.database.Article);
    const articleService = new ArticleService(articleRepository);
    const articleController = new ArticleController(articleService);
    const articleRouter = new ArticleRouter(articleController);

    this.app.use('/', articleRouter.getRouter());
  }

  getApp() {
    return this.app;
  }
}

module.exports = Application;
