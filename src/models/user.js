'use strict';
const { Model } = require('sequelize');

module.exports = class User extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      kyc_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false
    });
  }

  static associate(models) {
    this.hasMany(models.Wallet, {
      foreignKey: 'user_id',
      as: 'wallets'
    });
    this.hasMany(models.Order, {
      foreignKey: 'user_id',
      as: 'orders'
    });
    this.hasMany(models.PaymentMethod, {
      foreignKey: 'user_id',
      as: 'paymentMethods'
    });
  }
}