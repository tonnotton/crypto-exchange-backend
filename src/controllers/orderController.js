const { Order, User, Currency, Wallet } = require('../models');
const { sequelize } = require('../models');

class OrderController {
  // สร้างคำสั่งซื้อ/ขาย
  async create(req, res) {
    try {
      const { user_id, currency_id, payment_currency_id, type, amount, price } = req.body;
      
      const order = await Order.create({
        user_id,
        currency_id,
        payment_currency_id,
        type,
        amount,
        price,
        status: 'PENDING'
      });
      
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ดึงรายการคำสั่งซื้อ/ขายที่รอดำเนินการ
  async getPendingOrders(req, res) {
    try {
      const { currency_id } = req.query;
      const orders = await Order.findAll({
        where: {
          currency_id,
          status: 'PENDING'
        },
        include: [{
          model: User
        }, {
          model: Currency,
          as: 'currency'
        }]
      });
      
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // จับคู่คำสั่งซื้อ/ขาย
  async matchOrder(req, res) {
    const t = await sequelize.transaction();
    
    try {
      const { order_id, matching_order_id } = req.body;
      
      const order = await Order.findByPk(order_id);
      const matchingOrder = await Order.findByPk(matching_order_id);
      
      if (!order || !matchingOrder) {
        throw new Error('Orders not found');
      }
      
      // อัพเดทสถานะคำสั่ง
      await order.update({ status: 'COMPLETED' }, { transaction: t });
      await matchingOrder.update({ status: 'COMPLETED' }, { transaction: t });
      
      // โอนเงินระหว่างกระเป๋า (ควรมีการคำนวณค่าธรรมเนียม)
      
      await t.commit();
      res.json({ message: 'Orders matched successfully' });
    } catch (error) {
      await t.rollback();
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new OrderController();