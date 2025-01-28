'use strict';
const { Model } = require('sequelize');

module.exports = class Currency extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      currency_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      symbol: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('CRYPTO', 'FIAT'),
        allowNull: false
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {
      sequelize,
      modelName: 'Currency',
      tableName: 'currencies',
      timestamps: false
    });
  }

  static associate(models) {
    this.hasMany(models.Wallet, {
      foreignKey: 'currency_id',
      as: 'wallets'
    });
    this.hasMany(models.Order, {
      foreignKey: 'currency_id',
      as: 'orders'
    });
  }
}