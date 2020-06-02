const Post = require('../models/post')
const Comment = require('../models/comment');
const Like = require('../models/likes');

module.exports.create = async function(req, res){
 try{
      let post =  await Post.create({
         content: req.body.content,
         user: req.user._id 
       });


      if(req.xhr)
      {
       post = await post.populate('user','name').execPopulate();

       return res.status(200).json({
        data: {
          post: post
        },
        message: "post created !"
       }); 
      } 


       req.flash('success','Post published!');

      // return res.redirect('back');
   
    }catch(err)
    {
     req.flash('error',err);
     return res.redirect('back'); 
    }
}


module.exports.destroy = async function(req,res)
{
  
 try{ 
      let post = await Post.findById(req.params.id)
   
      //.id means converting the object id into string
      //check if post user is logged in user
   
      if(post.user == req.user.id)
      {
        post.remove();
        
        await Like.deleteMany({likeable: post,onModel: 'Post'});
        await Like.deleteMany({_id: {$in : post.comments}});
        
         
        await Comment.deleteMany({post: req.params.id});
        
        if(req.xhr)
        {
          return res.status(200).json({
          data: {
            post_id: req.params.id
          },
        
            message: "post deleted !"
         }); 
        } 

        req.flash('success','post and associated comments deleted'); 
        return res.redirect('back');


      }else{
        req.flash('error','You cannot delete this post');
        return res.redirect('back');
      }
    
    }catch(err){
       req.flash('Error',err);
       return res.redirect('back'); 
    }
}

