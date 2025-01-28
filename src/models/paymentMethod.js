'use strict';
const { Model } = require('sequelize');

module.exports = class PaymentMethod extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      payment_method_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('BANK', 'CARD'),
        allowNull: false
      },
      account_number: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      bank_name: {
        type: DataTypes.STRING(100)
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {
      sequelize,
      modelName: 'PaymentMethod',
      tableName: 'payment_methods',
      timestamps: false
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  }
}