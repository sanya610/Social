const express = require('express');
const router = express.Router();

const friendController = require('../controllers/friends_controller');

router.post('/',friendController.friendreq);
router.post('/friend/:id',friendController.friend);
router.get('/destroy/:id',friendController.remove_friend);


module.exports = router;