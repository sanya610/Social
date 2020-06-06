const express = require('express');
const router = express.Router();

const friendController = require('../controllers/friends_controller');

router.post('/:id',friendController.friendreq);
router.post('/friend/:id',friendController.friend);


module.exports = router;