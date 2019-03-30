module.exports = function(sequelize, DataTypes) {

  var Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING(16),
      isAlphanumeric: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(16),
      allowNull: false
    }
  })

  return Users;

};
