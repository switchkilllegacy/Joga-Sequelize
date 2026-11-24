class ArticleRepository {
  constructor(ArticleModel) {
    this.Article = ArticleModel;
  }

  findAll = async () => {
    return await this.Article.findAll();
  };
}

module.exports = ArticleRepository;
