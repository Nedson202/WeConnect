module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Categories', [ // eslint-disable-line no-unused-vars
    {
      category: 'health',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'science',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'medicine',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'sport',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'finance',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'tech',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'food',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'fashion',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'music',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'others',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Categories', [

    ], {}) // eslint-disable-line no-unused-vars
};
