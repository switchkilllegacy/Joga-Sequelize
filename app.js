const express = require('express');

class Application {
  constructor(database) {
    this.database = database;
    this.app = express();

    this.configureMiddleware();
    this.configureRoutes();
  }

  configureMiddleware() {
    this.app.use(express.json());

    this.app.use(
      express.urlencoded({
        extended: true,
      }),
    );
  }

  configureRoutes() {
    this.app.get('/', (req, res) => {
      res.status(200).json({
        message: 'Welcome to sequelize application.',
      });
    });
  }

  getApp() {
    return this.app;
  }
}

module.exports = Application;
