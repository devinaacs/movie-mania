'use strict';
const {
  Model
} = require('sequelize');

const { createHash } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Movie, { foreignKey: 'authorId' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: { msg: "Email must be unique" },
      validate: {
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email is required" },
        isEmail: { msg: 'Invalid email format' },
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "Password is required" },
        notEmpty: { msg: "Password is required" },
        len: { args: 5, msg: "Password must be atleast 3 characters in length" }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, options) => {
    instance.password = createHash(instance.password)
  });

  return User;
};