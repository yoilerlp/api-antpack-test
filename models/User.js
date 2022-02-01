const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: {
        args: true,
        msg: "Email en uso, por favor ingresar otro.",
      },
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

module.exports = User;