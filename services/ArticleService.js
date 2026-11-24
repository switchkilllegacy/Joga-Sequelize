class ArticleService {
  constructor(articleRepository) {
    this.articleRepository = articleRepository;
  }

  getAllArticles = async () => {
    return await this.articleRepository.findAll();
  };
}

module.exports = ArticleService;
