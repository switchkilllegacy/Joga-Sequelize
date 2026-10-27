'use strict';

const fs = require('fs').promises;
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const loadModels = async () => {
  const db = {};
  const files = await fs.readdir(__dirname);
  const modelFiles = files.filter(
    (file) =>
      !file.startsWith('.') &&
      file !== 'index.js' &&
      file.endsWith('.js') &&
      !file.endsWith('.test.js'),
  );

  for (const file of modelFiles) {
    const initializeModel = require(path.join(__dirname, file));
    const model = initializeModel(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }

  for (const model of Object.values(db)) {
    if (typeof model.associate === 'function') {
      model.associate(db);
    }
  }

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};

module.exports = loadModels;
