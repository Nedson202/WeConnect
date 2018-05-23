
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
      required: true
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
    },
    description: {
      type: DataTypes.STRING,
      required: true
    },
    image: {
      type: DataTypes.STRING,
    }
  });

  Business.associate = (models) => {
    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'businessOwner'
    });
    
    Business.hasMany(models.Review, {
      foreignKey: 'businessId',
      as: 'businessReviews',
      onDelete: 'cascade',
    });
  };

  return Business;
};
