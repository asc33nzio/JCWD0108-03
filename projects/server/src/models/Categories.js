'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
<<<<<<< HEAD
      Categories.hasMany(models.Products);
=======
      Categories.hasMany(models.Products, {
        foreignKey: 'categoryId',
        as: 'products',
      });
>>>>>>> c1b1038597e991bf40bcc7265e26d52be3b57d06
    }
  }

  Categories.init({
    category: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Categories',
    timestamps : false
  });
  return Categories;
};