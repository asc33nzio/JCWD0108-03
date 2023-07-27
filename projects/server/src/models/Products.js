'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.belongsTo(models.Categories)
    }
  }
  Products.init({
    productName: {
      type: DataTypes.STRING,
      unique: true
    },
    price: DataTypes.STRING,
    imgURL: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};