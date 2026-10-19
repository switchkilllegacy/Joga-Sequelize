'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Authors',
      [
        { id: 1, name: 'Ashley Galvin' },
        { id: 2, name: 'Patrick Beach' },
        { id: 3, name: 'MacKenzie Miller' },
      ],
      { ignoreDuplicates: true },
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Authors', null, {});
  },
};
