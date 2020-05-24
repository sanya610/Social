const express = require('express');
const router = express.Router();
const passport = require('passport');

const todoController = require('../controllers/todoList_controller');

router.get('/:id',todoController.list);
router.post('/createTodo',todoController.createlist);
router.post('/delete-list',todoController.deleteList);

module.exports = router;
