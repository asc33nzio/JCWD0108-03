'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Sales extends Model {
        static associate(models) {

        }
    }
    Sales.init(
        {
            productName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            quantitySold: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            totalAmount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            transactionDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            completed: {
                type: DataTypes.STRING,
                defaultValue: false
            }
        },
        {
            sequelize,
            modelName: 'Sales',
        }
    );
    return Sales;
};
