'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING
    },
    year:{
      type: DataTypes.INTEGER
    },
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};