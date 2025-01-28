const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const walletRoutes = require('./walletRoutes');
const orderRoutes = require('./orderRoutes');

router.use('/users', userRoutes);
router.use('/wallets', walletRoutes);
router.use('/orders', orderRoutes);

module.exports = router;