'use strict';
const { Model } = require('sequelize');

module.exports = class Transaction extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      transaction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      from_wallet_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      to_wallet_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      currency_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL(20, 8),
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('INTERNAL', 'EXTERNAL'),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED'),
        defaultValue: 'PENDING'
      },
      tx_hash: {
        type: DataTypes.STRING(100)
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      sequelize,
      modelName: 'Transaction',
      tableName: 'transactions',
      timestamps: false
    });
  }

  static associate(models) {
    this.belongsTo(models.Wallet, {
      foreignKey: 'from_wallet_id',
      as: 'fromWallet'
    });
    this.belongsTo(models.Wallet, {
      foreignKey: 'to_wallet_id',
      as: 'toWallet'
    });
    this.belongsTo(models.Currency, {
      foreignKey: 'currency_id'
    });
  }
}