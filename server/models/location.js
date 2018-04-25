
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    location: DataTypes.STRING,
  });

  return Location;
};
