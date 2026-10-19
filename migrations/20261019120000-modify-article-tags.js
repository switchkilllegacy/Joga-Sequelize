'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('ArticleTags', ['article_id'], {
      name: 'ArticleTags_article_id',
    });
    await queryInterface.sequelize.query(
      'ALTER TABLE `ArticleTags` DROP PRIMARY KEY',
    );
    await queryInterface.addColumn('ArticleTags', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });
    await queryInterface.renameColumn('ArticleTags', 'article_id', 'articleId');
    await queryInterface.renameColumn('ArticleTags', 'tag_id', 'tagId');
    await queryInterface.addColumn('ArticleTags', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('ArticleTags', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    const timestamp = new Date();
    await queryInterface.bulkUpdate(
      'ArticleTags',
      { createdAt: timestamp, updatedAt: timestamp },
      {},
    );
    await queryInterface.changeColumn('ArticleTags', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn('ArticleTags', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('ArticleTags', 'updatedAt');
    await queryInterface.removeColumn('ArticleTags', 'createdAt');
    await queryInterface.renameColumn('ArticleTags', 'articleId', 'article_id');
    await queryInterface.renameColumn('ArticleTags', 'tagId', 'tag_id');
    await queryInterface.sequelize.query(
      'ALTER TABLE `ArticleTags` DROP PRIMARY KEY',
    );
    await queryInterface.removeColumn('ArticleTags', 'id');
    await queryInterface.sequelize.query(
      'ALTER TABLE `ArticleTags` ADD PRIMARY KEY (`article_id`, `tag_id`)',
    );
    await queryInterface.removeIndex('ArticleTags', 'ArticleTags_article_id');
  },
};
