
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    reviewer: DataTypes.STRING,
    message: DataTypes.STRING
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Business, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE',
      hooks: true
    });
  };

  return Review;
};
