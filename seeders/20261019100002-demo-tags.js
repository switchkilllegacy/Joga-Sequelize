'use strict';

module.exports = {
  async up(queryInterface) {
    const names = [
      'yogapractice',
      'yogainspiration',
      'wellness',
      'nature',
      'spiritual',
      'sport',
      'yogateacher',
    ];
    const timestamp = new Date('2022-02-16T13:32:01');

    await queryInterface.bulkInsert(
      'Tags',
      names.map((name, index) => ({
        id: index + 1,
        name,
        createdAt: timestamp,
        updatedAt: timestamp,
      })),
      { ignoreDuplicates: true },
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tags', null, {});
  },
};
