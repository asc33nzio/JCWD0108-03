'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    // static associate(models) {
    //   Categories.hasMany(models.Products, {
    //     foreignKey: 'categoryId',
    //     as: 'products',
    //   });
    // }
  }

  Categories.init({
    category: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};