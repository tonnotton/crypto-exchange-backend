const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

router.post('/', walletController.create);
router.post('/transfer', walletController.transfer);
router.get('/:walletId/balance', walletController.getBalance);

module.exports = router;