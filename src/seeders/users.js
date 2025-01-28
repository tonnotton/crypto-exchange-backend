'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'testuser1',
        email: 'test1@example.com',
        password_hash: 'password123', // ควรใช้ hashed password จริง
        kyc_status: true,
        created_at: new Date()
      },
      {
        username: 'testuser2',
        email: 'test2@example.com',
        password_hash: 'password123',
        kyc_status: false,
        created_at: new Date()
      }
    ], {});

    // สร้าง wallet สำหรับผู้ใช้ทดสอบ
    const users = await queryInterface.sequelize.query(
      'SELECT user_id FROM users;'
    );
    const currencies = await queryInterface.sequelize.query(
      'SELECT currency_id FROM currencies;'
    );

    const userRows = users[0];
    const currencyRows = currencies[0];

    const wallets = [];
    userRows.forEach(user => {
      currencyRows.forEach(currency => {
        wallets.push({
          user_id: user.user_id,
          currency_id: currency.currency_id,
          balance: 1000.00, // เงินเริ่มต้นสำหรับทดสอบ
          wallet_address: `WALLET-${user.user_id}-${currency.currency_id}`,
          created_at: new Date()
        });
      });
    });

    await queryInterface.bulkInsert('wallets', wallets, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('wallets', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};