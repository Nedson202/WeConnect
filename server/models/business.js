
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    name: {
      type: DataTypes.STRING,
      required: true,
      unique: {
        args: true,
        msg: 'Business with name is already registered'
      }
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: {
        args: true,
        msg: 'Email is already taken'
      }
    },
    address: {
      type: DataTypes.STRING,
      required: true
    },
    location: {
      type: DataTypes.STRING,
      required: true
    },
    category: {
      type: DataTypes.STRING,
      required: true
    }
  });

  Business.associate = (models) => {
    Business.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'cascade',
      hooks: true
    });
    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: true
    });
    Business.hasMany(models.Review, {
      foreignKey: 'businessId',
      as: 'businessReviews',
      onDelete: 'cascade',
      hooks: true
    });
  };

  return Business;
};
