'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ArticleTag extends Model {
    static associate(models) {
      this.belongsTo(models.Article, { foreignKey: 'articleId' });
      this.belongsTo(models.Tag, { foreignKey: 'tagId' });
    }
  }

  ArticleTag.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ArticleTag',
      tableName: 'ArticleTags',
    },
  );

  return ArticleTag;
};
