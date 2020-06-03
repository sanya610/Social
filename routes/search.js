const express = require('express');
const router = express.Router();

const searchController = require('../controllers/home_controller');

router.post('/',searchController.searchUser);

module.exports = router;