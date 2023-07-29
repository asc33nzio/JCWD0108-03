'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Sales extends Model {
        static associate(models) {
            Sales.belongsTo(models.Transactions, {
                foreignKey: 'transactionId'
            });
            Sales.belongsTo(models.Products, {
                foreignKey: 'productId'
            });
        }
    }
    Sales.init(
        {
            productName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            quantitySold: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            totalAmount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            completed: {
                type: DataTypes.STRING,
                defaultValue: false
            },
            transactionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            productId: {
                type: DataTypes.INTEGER
            }
        },
        {
            sequelize,
            modelName: 'Sales',
            timestamps: true,
            createdAt: 'saleDate'
        }
    );
    return Sales;
};
