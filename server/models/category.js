module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category: {
      type: DataTypes.STRING
    }
  });

  Category.associate = (models) => {
    Category.hasMany(models.Business, {
      foreignKey: 'categoryId',
      as: 'users',
      onDelete: 'CASCADE'
    });
  };

  return Category;
};
