
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Businesses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    email: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
    },
    image: {
      type: Sequelize.STRING
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Businesses') // eslint-disable-line no-unused-vars
};
