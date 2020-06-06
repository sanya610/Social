const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);

router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comment'));
router.use('/api',require('./api'));
router.use('/reset_password',require('./reset_password'));
router.use('/likes',require('./likes'));
router.use('/search',require('./search'));
router.use('/isfriend',require('./isfriend'));


module.exports = router;