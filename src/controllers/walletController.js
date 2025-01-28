const { Wallet, Transaction, Currency } = require('../models');
const { sequelize } = require('../models');

class WalletController {
  // สร้างกระเป๋าเงินใหม่
  async create(req, res) {
    try {
      const { user_id, currency_id } = req.body;
      const wallet = await Wallet.create({
        user_id,
        currency_id,
        balance: 0,
        wallet_address: `WALLET-${Date.now()}` 
      });
      
      res.status(201).json(wallet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // โอนเงินระหว่างกระเป๋า
  async transfer(req, res) {
    const t = await sequelize.transaction();
    
    try {
      const { from_wallet_id, to_wallet_id, amount } = req.body;
      
      // ตรวจสอบกระเป๋าต้นทาง
      const fromWallet = await Wallet.findByPk(from_wallet_id);
      if (!fromWallet || fromWallet.balance < amount) {
        throw new Error('Insufficient balance');
      }
      
      // สร้างธุรกรรม
      const transaction = await Transaction.create({
        from_wallet_id,
        to_wallet_id,
        amount,
        type: 'INTERNAL',
        status: 'PENDING',
        currency_id: fromWallet.currency_id
      }, { transaction: t });
      
      // อัพเดทยอดเงิน
      await Wallet.decrement('balance', {
        by: amount,
        where: { wallet_id: from_wallet_id },
        transaction: t
      });
      
      await Wallet.increment('balance', {
        by: amount,
        where: { wallet_id: to_wallet_id },
        transaction: t
      });
      
      await t.commit();
      
      res.json(transaction);
    } catch (error) {
      await t.rollback();
      res.status(500).json({ error: error.message });
    }
  }

  // ดูยอดเงินในกระเป๋า
  async getBalance(req, res) {
    try {
      const { walletId } = req.params;
      const wallet = await Wallet.findByPk(walletId, {
        include: [{
          model: Currency
        }]
      });
      
      if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
      }
      
      res.json(wallet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new WalletController();