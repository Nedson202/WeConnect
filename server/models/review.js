module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    message: DataTypes.STRING,
    rating: DataTypes.FLOAT
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Business, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE',
      as: 'businessReviews'
    });

    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'reviewer'
    });
  };

  return Review;
};
