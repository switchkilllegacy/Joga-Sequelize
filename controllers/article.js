// connect to database ORM object
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'joga_sequelize',
  'joga_app',
  process.env.DB_PASSWORD,
  {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
  },
);

// read models data for table representation
const Article = require('../models/article')(sequelize, Sequelize.DataTypes);

// get all data from table
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    console.log(articles);
    return res.status(200).json({ articles });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// show article by this slug
const getArticleBySlug = async (req, res) => {
  Article.findOne({ where: { slug: req.params.slug } })
    .then((article) => {
      console.log(article);
      return res.status(200).json({ article });
    })
    .catch((error) => {
      return res.status(500).send(error.message);
    });
};

// export controller functions
module.exports = {
  getAllArticles,
  getArticleBySlug,
};
