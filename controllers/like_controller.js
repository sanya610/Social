const Like = require('../models/likes');
const Comment = require('../models/comment');
const Post = require('../models/post');



module.exports.togglelike = async function(req,res)
{
    try{

        let likeable;
        let deleted = false;
        
        
        if(req.query.type == 'Post')
        {
             likeable = await Post.findById(req.query.id).populate('likes');           
 
        }else{
        
             likeable = await Comment.findById(req.query.id).populate('likes');  
        }

        //check if a like already exist
        let existingNew =  await Like.findOne({
            user: req.user._id,
            onModel: req.query.type, 
            likeable: req.query.id
        });

        // if a like already exist then delete it  
        if(existingNew)
        {
             likeable.likes.pull(existingNew._id);
             likeable.save();
             existingNew.remove();   
             deleted = true;
        }else{
            //else make a new like 

            let newLike = await Like.create({
            user: req.user._id,
            onModel: req.query.type, 
            likeable: req.query.id 
         });   

         likeable.likes.push(newLike._id);
         likeable.save();
        }

        return res.json(200,{
            message: "Request Successful",
            data:{
                deleted : deleted
            }
        })

    }catch(err){
      console.log(err); 
      return res.json(500,{
         message: 'Internal Server error'
      });   
    } 
}



