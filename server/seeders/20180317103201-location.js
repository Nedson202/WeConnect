module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Locations', [ // eslint-disable-line no-unused-vars
    {
      location: 'Abia',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Adamawa',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Akwa Ibom',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Anambra',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Bauchi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Bayelsa',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Benue',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Borno',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Cross River',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Delta',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Ebonyi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Edo',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Ekiti',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Enugu',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'FCT',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Gombe',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Imo',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Jigawa',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Kano',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Katsina',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Kebbi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Kogi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Kwara',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Lagos',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Nasarawa',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Niger',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Ogun',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Ondo',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Osun',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Plateau',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Rivers',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Sokoto',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Taraba',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Yobe',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      location: 'Zamfara',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Locations', [// eslint-disable-line no-unused-vars

  ], {})
};
