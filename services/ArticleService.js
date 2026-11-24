class ArticleService {
  constructor(articleRepository) {
    this.articleRepository = articleRepository;
  }

  getAllArticles = async () => {
    return await this.articleRepository.findAll();
  };

  getArticleBySlug = async (slug) => {
    const article = await this.articleRepository.findBySlug(slug);

    if (!article) {
      const error = new Error(`Article with slug "${slug}" not found`);
      error.statusCode = 404;
      throw error;
    }

    return article;
  };
}

module.exports = ArticleService;
