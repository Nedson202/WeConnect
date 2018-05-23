module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    message: DataTypes.STRING
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Business, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE',
    });

    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'reviewer'      
    });
  };

  return Review;
};
