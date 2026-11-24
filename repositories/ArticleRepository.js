class ArticleRepository {
  constructor(ArticleModel) {
    this.Article = ArticleModel;
  }

  findAll = async () => {
    return await this.Article.findAll();
  };

  findBySlug = async (slug) => {
    return await this.Article.findOne({
      where: { slug },
    });
  };
}

module.exports = ArticleRepository;
