'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      Movie.belongsTo(models.User, { foreignKey: 'authorId' });
      Movie.belongsTo(models.Genre, { foreignKey: 'genreId' });
      Movie.hasMany(models.Cast, { foreignKey: 'movieId' });
    }
  }
  Movie.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "Title is required" },
        notEmpty: { msg: "Title is required" }
      }
    },
    synopsis: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notNull: { msg: "Synopsis is required" },
        notEmpty: { msg: "Synopsis is required" }
      }
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: 1, msg: "Rating must be greater than 1." }
      }
    },
    genreId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    userMongoId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};