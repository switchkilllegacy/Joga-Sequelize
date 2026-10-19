'use strict';

const articleTagNames = {
  'introduction-to-ashtanga': ['yogapractice', 'yogainspiration'],
  'morning-vinyasa-flow-routine': ['yogapractice', 'wellness'],
  'secrets-of-a-yoga-teacher': ['nature', 'spiritual', 'sport'],
};

module.exports = {
  async up(queryInterface) {
    const [articles] = await queryInterface.sequelize.query(
      'SELECT id, slug FROM Articles WHERE slug IN (:slugs)',
      { replacements: { slugs: Object.keys(articleTagNames) } },
    );
    const [tags] = await queryInterface.sequelize.query(
      'SELECT id, name FROM Tags WHERE name IN (:names)',
      {
        replacements: {
          names: [...new Set(Object.values(articleTagNames).flat())],
        },
      },
    );

    const articleIds = new Map(articles.map(({ id, slug }) => [slug, id]));
    const tagIds = new Map(tags.map(({ id, name }) => [name, id]));
    const links = Object.entries(articleTagNames).flatMap(([slug, names]) =>
      names.map((name) => ({
        articleId: articleIds.get(slug),
        tagId: tagIds.get(name),
      })),
    );

    if (links.some(({ articleId, tagId }) => !articleId || !tagId)) {
      throw new Error('Article or tag records are missing for article tags.');
    }

    const targetArticleIds = [...articleIds.values()];
    await queryInterface.bulkDelete('ArticleTags', {
      articleId: targetArticleIds,
    });
    const timestamp = new Date();
    await queryInterface.bulkInsert(
      'ArticleTags',
      links.map((link) => ({
        ...link,
        createdAt: timestamp,
        updatedAt: timestamp,
      })),
      {},
    );
  },

  async down(queryInterface) {
    const [articles] = await queryInterface.sequelize.query(
      'SELECT id FROM Articles WHERE slug IN (:slugs)',
      { replacements: { slugs: Object.keys(articleTagNames) } },
    );
    await queryInterface.bulkDelete('ArticleTags', {
      articleId: articles.map(({ id }) => id),
    });
  },
};
