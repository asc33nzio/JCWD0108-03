'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CartItems extends Model {
        static associate(models) {
            CartItems.belongsTo(models.Products);
            CartItems.belongsTo(models.Transactions);
        }
    }
    CartItems.init({
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
    }, {
        sequelize,
        modelName: 'CartItems',
    });
    return CartItems;
};