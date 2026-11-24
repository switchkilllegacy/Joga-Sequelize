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
}

module.exports = ArticleController;
