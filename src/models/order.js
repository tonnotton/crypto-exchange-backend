'use strict';
const { Model } = require('sequelize');

module.exports = class Order extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      currency_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      payment_currency_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('BUY', 'SELL'),
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL(20, 8),
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(20, 8),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('PENDING', 'COMPLETED', 'CANCELLED'),
        defaultValue: 'PENDING'
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      sequelize,
      modelName: 'Order',
      tableName: 'orders',
      timestamps: false
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    this.belongsTo(models.Currency, {
      foreignKey: 'currency_id',
      as: 'currency'
    });
    this.belongsTo(models.Currency, {
      foreignKey: 'payment_currency_id',
      as: 'paymentCurrency'
    });
  }
}