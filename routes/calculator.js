const express = require('express');
const router = express.Router();

const calculatorsController = require('../controllers/calculator');

router.get('/',calculatorsController.findCalc);

module.exports = router;