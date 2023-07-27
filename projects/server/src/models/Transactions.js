'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Transactions extends Model {
        static associate(models) {
            Transactions.hasMany(models.CartItems);
            Transactions.hasOne(models.Payments);
        }
    }
    Transactions.init(
        {
            txTime: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            totalAmount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
        },
        {
            sequelize,
            modelName: 'Transactions',
            timestamps: false
        }
    );
    return Transactions;
};
