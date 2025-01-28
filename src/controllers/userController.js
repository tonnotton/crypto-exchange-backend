const { User, Wallet } = require('../models');

class UserController {
  // สร้างผู้ใช้ใหม่
  async create(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({
        username,
        email,
        password_hash: password, 
        kyc_status: false
      });
      
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ดึงข้อมูลผู้ใช้และ wallet
  async getProfile(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId, {
        include: [{
          model: Wallet,
          as: 'wallets'
        }]
      });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // อัพเดท KYC status
  async updateKycStatus(req, res) {
    try {
      const { userId } = req.params;
      const { kyc_status } = req.body;
      
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      user.kyc_status = kyc_status;
      await user.save();
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();