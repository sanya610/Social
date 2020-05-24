const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
  description: {
   type: String,
   required: true   
  },
  
  category: {
   type: String,
   required: true   
  },

  duedate: {
   type: String,
   required: true   
  },

  user: {
     type:  mongoose.Schema.Types.ObjectId,
     ref: 'User'
    }
});

const Todo = mongoose.model('Todo',todoSchema);
module.exports = Todo;