'use strict';

const models = require('../../models');

const requiredFields = ['name', 'slug', 'image', 'body'];
const editableFields = [...requiredFields, 'published', 'author_id'];

const getId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const isUniqueConstraintError = (error) =>
  error.name === 'SequelizeUniqueConstraintError';

const createArticle = async (req, res) => {
  const missingField = requiredFields.find(
    (field) =>
      typeof req.body[field] !== 'string' || req.body[field].trim() === '',
  );

  if (missingField) {
    return res.status(400).json({ message: `${missingField} is required` });
  }

  const articleData = Object.fromEntries(
    requiredFields.map((field) => [field, req.body[field].trim()]),
  );
  articleData.published = req.body.published
    ? new Date(req.body.published)
    : new Date();

  if (Number.isNaN(articleData.published.getTime())) {
    return res.status(400).json({ message: 'published must be a valid date' });
  }

  if (req.body.author_id !== undefined && req.body.author_id !== '') {
    articleData.author_id = getId(req.body.author_id);
    if (!articleData.author_id) {
      return res
        .status(400)
        .json({ message: 'author_id must be a positive integer' });
    }

    const author = await models.Author.findByPk(articleData.author_id);
    if (!author) {
      return res.status(400).json({ message: 'author_id does not exist' });
    }
  } else {
    articleData.author_id = null;
  }

  try {
    const article = await models.Article.create(articleData);
    return res.status(200).json({
      message: 'New article is added',
      article,
    });
  } catch (error) {
    const status = isUniqueConstraintError(error) ? 409 : 500;
    return res.status(status).json({ message: error.message });
  }
};

const getArticleForEdit = async (req, res) => {
  const id = getId(req.params.id);
  if (!id) {
    return res
      .status(400)
      .json({ message: 'Article id must be a positive integer' });
  }

  try {
    const [article, authors] = await Promise.all([
      models.Article.findByPk(id, {
        include: [
          { model: models.Author, as: 'author' },
          { model: models.Tag, as: 'tags' },
        ],
      }),
      models.Author.findAll({ order: [['name', 'ASC']] }),
    ]);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    return res.status(200).json({ article, authors });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  const id = getId(req.params.id);
  if (!id) {
    return res
      .status(400)
      .json({ message: 'Article id must be a positive integer' });
  }

  const updates = {};
  for (const field of editableFields) {
    if (Object.hasOwn(req.body, field)) {
      updates[field] = req.body[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    return res
      .status(400)
      .json({ message: 'At least one article field is required' });
  }

  for (const field of requiredFields) {
    if (
      Object.hasOwn(updates, field) &&
      (typeof updates[field] !== 'string' || updates[field].trim() === '')
    ) {
      return res.status(400).json({ message: `${field} cannot be empty` });
    }
    if (typeof updates[field] === 'string') {
      updates[field] = updates[field].trim();
    }
  }

  if (Object.hasOwn(updates, 'published')) {
    updates.published = new Date(updates.published);
    if (Number.isNaN(updates.published.getTime())) {
      return res
        .status(400)
        .json({ message: 'published must be a valid date' });
    }
  }

  if (Object.hasOwn(updates, 'author_id')) {
    if (updates.author_id === '') {
      updates.author_id = null;
    } else if (updates.author_id !== null) {
      updates.author_id = getId(updates.author_id);
      if (!updates.author_id) {
        return res
          .status(400)
          .json({ message: 'author_id must be a positive integer' });
      }

      const author = await models.Author.findByPk(updates.author_id);
      if (!author) {
        return res.status(400).json({ message: 'author_id does not exist' });
      }
    }
  }

  try {
    const article = await models.Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    await article.update(updates);
    return res.status(200).json({ message: 'Article is updated', article });
  } catch (error) {
    const status = isUniqueConstraintError(error) ? 409 : 500;
    return res.status(status).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  const id = getId(req.params.id);
  if (!id) {
    return res
      .status(400)
      .json({ message: 'Article id must be a positive integer' });
  }

  try {
    const article = await models.Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    await article.destroy();
    return res.status(200).json({ message: 'Article is deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createArticle,
  getArticleForEdit,
  updateArticle,
  deleteArticle,
};
