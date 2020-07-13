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
                     
                     console.log('content',req.body.content);
                     console.log('req.body',req.body);
                     console.log('post',post);

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
                     // return res.status(200).json({
                     //    data: {
                     //       post: post
                     //    },
                     // });
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

      // req.flash('success','Post published!');
      // return res.redirect('back');

    }catch(err){
       console.log('error',err);
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
        await Like.deleteMany({likeable: post, onModel: 'Post'});
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









// module.exports.create =async function(req, res){
//    try{
     
//     await Post.uploadedPic(req, res, async function(err){
//       try{
//          console.log('hello world');
//        if (req.file){
//                  let post= await Post.create({
//                  content: req.body.content,
//                  user: req.user._id,
//                  pic: Post.picPath + '/' + req.file.filename
//                })
//                //checking for the ajax request
//              console.log("if",post);
//              post = await post.populate('user', 'name email').execPopulate();
//              if (req.xhr){
//                return res.status(200).json({
//                    data: {
//                        post: post
//                    },
//                    message: "Post created!"
//                });
//              }
//    }
   
//      else{
//       console.log(req.body.content);
//              console.log('hello');
//              let post= await Post.create({
//              content: req.body.content,
//              user: req.user._id,
//            });
//          //  checking for the ajax request
//          console.log("else",post);
//          post = await post.populate('user', 'name email').execPopulate();
//          if (req.xhr){
//            return res.status(200).json({
//                data: {
//                    post: post
//                },
//                message: "Post created!"
//            });
//          }
//    }
//    console.log(post);
//  }
//  catch(err){
//    req.flash('error',err);
//       return;
//  }
 
//       req.flash('success','post is published');
//      return res.redirect('back');
//    });
//    }
//    catch(err){
//       req.flash('error',err);
//       return;
//    }
 
//  }