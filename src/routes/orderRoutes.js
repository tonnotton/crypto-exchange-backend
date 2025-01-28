const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.create);
router.get('/pending', orderController.getPendingOrders);
router.post('/match', orderController.matchOrder);

module.exports = router;