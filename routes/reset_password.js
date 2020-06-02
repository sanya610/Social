const express = require('express');
const router = express.Router();

const passwordController = require('../controllers/passwords_controller');

router.get('/verify-email',passwordController.openmail);
router.post('/change-password',passwordController.verifymail);
router.post('/:accessToken',passwordController.resetPassword);

module.exports = router;