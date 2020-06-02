const Todo = require('../models/todo');


module.exports.list = function(req,res)
{  
    Todo.find({user: req.params.id},function(err,todolist){ 
     if(err) 
     {
      console.log('Error in fetching the list contents from db');
      return; 
     }

      return res.render('todo',{
      title: "Todo list",
      list: todolist
   });
  }); 
}


 
module.exports.createlist = function(req,res){
 Todo.create({
   description: req.body.description,
   category: req.body.category,
   duedate: req.body.duedate,
   user: req.user._id
 },function(err,newList)
   {
    if(err)
    {
     console.log('Error in creating a todo list !');
     return;  
    }
    
    console.log('***',newList);
    return res.redirect('back');
   });
}



//Deleting the list entry
module.exports.deleteList = function(req,res)
{

 //get the info from query in the url 
 for(let i in req.body)
 {
    
 //find the list in db using id and delete
   Todo.findByIdAndDelete(req.body[i],function(err){
   if(err){
     console.log('Error in deleting an object from dB');
     return; 
    }
  });
 }
 return res.redirect('back');  
}