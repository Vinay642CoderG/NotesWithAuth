const { Model, DataTypes } = require('sequelize')
const sequelize = require("../database")
const User = require("./user")

class Note extends Model {}
Note.init({
    userId: {
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    title:{
    type: DataTypes.CHAR(length=300),
    allowNull: false
   },
   description:{
    type: DataTypes.STRING(length=500),
    allowNull: false
   }

}, {
    timestamps: true,
    sequelize,
    modelName: "Note",
    tableName: "notes",
})


module.exports = Note;