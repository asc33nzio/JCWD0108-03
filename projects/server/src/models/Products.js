'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.belongsTo(models.Categories, {
        foreignKey: {
          allowNull: false
        }
      });
      Products.hasMany(models.CartItems);
    }
  }
  Products.init({
    productName: {
      type: DataTypes.STRING,
      unique: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imgURL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};