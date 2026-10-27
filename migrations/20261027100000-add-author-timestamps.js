'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Authors', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('Authors', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    const timestamp = new Date();
    await queryInterface.bulkUpdate(
      'Authors',
      { createdAt: timestamp, updatedAt: timestamp },
      {},
    );

    await queryInterface.changeColumn('Authors', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn('Authors', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Authors', 'updatedAt');
    await queryInterface.removeColumn('Authors', 'createdAt');
  },
};
