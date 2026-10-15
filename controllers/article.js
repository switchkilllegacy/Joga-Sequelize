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

// read model data for table representation
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

// export controller functions
module.exports = {
  getAllArticles,
};
