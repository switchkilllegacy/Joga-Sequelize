require('dotenv').config();

const connection = {
  username: 'joga_app',
  password: process.env.DB_PASSWORD,
  database: 'joga_sequelize',
  host: '127.0.0.1',
  dialect: 'mysql',
};

module.exports = {
  development: connection,
  test: connection,
  production: connection,
};
