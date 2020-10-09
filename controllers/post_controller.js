const Post = require('../models/post');
const fs = require('fs');
const path = require('path');
const Comment = require('../models/comment');
const Like = require('../models/likes');


module.exports.create = async function(req, res){
 try{
      Post.uploadedPic(req,res,async function(err)
      {
         try{
                  if(req.file){
                     let post =  await Post.create({
                        content: req.body.content,
                        user: req.user._id,
                        pic: Post.picPath + '/' + req.file.filename
                     });

                     post = await post.populate('user', 'name email').execPopulate();   

                     if(req.xhr){
                        return res.status(200).json({
                        data: {
                           post: post
                        },
                           
                        message: "post created !"
                        }); 
                     }
                     req.flash('success','Post published!');
                     return res.redirect('back');
                  }
                  

                  else{
                     let post =  await Post.create({
                        content: req.body.content,
                        user: req.user._id
                     });
                     
                      
                      await post.populate('user','name').execPopulate();
                      
                     if(req.xhr){
                        return res.status(200).json({
                        data: {
                           post: post
                        },
                        
                        message: "post created !"
                        }); 
                     }   
                     req.flash('success','Post published!');
                     return res.redirect('back');
                  }   
            
            
            }catch(err){
              console.log('error',err);
              return res.redirect('back');
            }
      });

    }catch(err){
       console.log('error',err);
       return res.redirect('back'); 
    }
}




module.exports.destroy = async function(req,res)
{
 try{ 
      let post = await Post.findById(req.params.id)   
      if(post.user == req.user.id)
      {
        post.remove();
        await Like.deleteMany({likeable: post, onModel: 'Post'});
        await Like.deleteMany({_id: {$in : post.comments}});
        await Comment.deleteMany({post: req.params.id});


        if(req.file)
        {
          if(post.pic){
            //we will be deleting from path
            fs.unlinkSync(path.join(__dirname,'..',post.pic));
          } 
          user.avatar = Post.picPath + '/' + req.file.filename;
        } 

        
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









