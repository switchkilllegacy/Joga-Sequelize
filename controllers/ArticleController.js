class ArticleController {
  constructor(articleService) {
    this.articleService = articleService;
  }

  getAllArticles = async (req, res, next) => {
    try {
      const articles = await this.articleService.getAllArticles();

      res.status(200).json({
        articles,
      });
    } catch (error) {
      next(error);
    }
  };

  getArticleBySlug = async (req, res, next) => {
    try {
      const article = await this.articleService.getArticleBySlug(
        req.params.slug,
      );

      res.status(200).json({
        article,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ArticleController;
