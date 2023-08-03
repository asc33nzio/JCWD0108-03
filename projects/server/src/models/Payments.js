'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    static associate(models) {
      Payments.belongsTo(models.Transactions);
    }
  }
  Payments.init(
    {
      amountPaid: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      changeAmount: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Payments',
    }
  );
  return Payments;
};
