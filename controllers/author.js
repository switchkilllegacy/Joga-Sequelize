'use strict';

const models = require('../models');

const getAuthorById = async (req, res) => {
  try {
    const author = await models.Author.findByPk(req.params.id, {
      include: [{ model: models.Article, as: 'articles' }],
    });

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(200).json({ author });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { getAuthorById };
