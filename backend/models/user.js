const { Model, DataTypes } = require('sequelize')
const sequelize = require("../database")

class User extends Model {}

User.init({
  name:{
    type: DataTypes.CHAR(length=256),
    allowNull: false,
  },
  email:{
    type: DataTypes.CHAR(length=256),
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true,
    }
  },
  phoneNumber:{
    type: DataTypes.CHAR(length=10),
    allowNull: false,
    unique: true,
    validate: {
        isNumeric: true,
    }
  },
  password:{
    type: DataTypes.CHAR(length=10),
    allowNull: false
  },
  lastLogin:{
    type: DataTypes.DATE()
  }
},
{
  timestamps: true,
  sequelize,
  modelName: "User",
  tableName: "users",
})


module.exports = User;

