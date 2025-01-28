'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('currencies', [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        type: 'CRYPTO',
        is_active: true
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        type: 'CRYPTO',
        is_active: true
      },
      {
        symbol: 'XRP',
        name: 'Ripple',
        type: 'CRYPTO',
        is_active: true
      },
      {
        symbol: 'DOGE',
        name: 'Dogecoin',
        type: 'CRYPTO',
        is_active: true
      },
      {
        symbol: 'THB',
        name: 'Thai Baht',
        type: 'FIAT',
        is_active: true
      },
      {
        symbol: 'USD',
        name: 'US Dollar',
        type: 'FIAT',
        is_active: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('currencies', null, {});
  }
};