'use strict';
const Sequelize = require('sequelize');
const moment = require('moment');

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

/* module.exports = (sequelize, DataTypes) => {
  class Book extends Sequelize.Model {
    publishedAt() {
      const date = moment(this.createdAt).format('MMMM D, YYYY, h:mm:ss a');
      return date;
    }
    shortDescription() {
      const description = this.body.length > 200 ? this.body.substring(0, 200) + '...' : this.body;
      return description;
    }
  }

  Book.init({
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    genre: Sequelize.STRING,
    year: Sequelize.INTEGER
  }, { sequelize });

    return Book;
    };
    */