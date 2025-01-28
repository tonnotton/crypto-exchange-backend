'use strict';
const { Model } = require('sequelize');

module.exports = class Wallet extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      wallet_id: {
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
      balance: {
        type: DataTypes.DECIMAL(20, 8),
        defaultValue: 0
      },
      wallet_address: {
        type: DataTypes.STRING(100),
        unique: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      sequelize,
      modelName: 'Wallet',
      tableName: 'wallets',
      timestamps: false
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    this.belongsTo(models.Currency, {
      foreignKey: 'currency_id'
    });
  }
}