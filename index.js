require('dotenv').config();

const express = require('express');
const app = express();

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

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

// testing connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connect to the database successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

// using routes and controllers
const articleRouter = require('./routes/article');
app.use('/', articleRouter);

// listen requests
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
