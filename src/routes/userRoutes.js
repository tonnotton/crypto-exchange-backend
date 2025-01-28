const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.create);
router.get('/:userId', userController.getProfile);
router.patch('/:userId/kyc', userController.updateKycStatus);

module.exports = router;