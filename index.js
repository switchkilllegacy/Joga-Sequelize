require('dotenv').config();

const Application = require('./app');
const sequelize = require('./config/database');

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database!');

    const application = new Application(sequelize);
    const app = application.getApp();

    app.listen(3026, () => {
      console.log('Server running on http://localhost:3026');
    });
  } catch (error) {
    console.error('Unable to start application:', error);
  }
};

startServer();
