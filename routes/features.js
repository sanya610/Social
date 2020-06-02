const express = require('express');
const router = express.Router();
const passport = require('passport');


router.use('/todo',require('./todo'));
router.use('/calculator',require('./calculator'));


module.exports = router;