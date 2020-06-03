const Post = require('../models/post');
const User=require('../models/user');



module.exports.home=async function(req,res){
try{
    let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
             path: 'user'
      }
    });

    let users=await User.find({});
     
    return res.render('home',{
        title: 'social|home',
        posts: posts,
        all_users: users
    });
   }
   catch(err){
     console.log('error',err);
   }
  }


module.exports.searchUser = async function(req,res)
{
  try{
       let result= await User.find({name:{$regex : '.*'+req.body.user_friend+'.*'}});
       
       if(req.xhr)
       {
         
         return res.status(200).json({
          data: {
           result: result
        },
         message: "search found !"
       }); 
      } 

  }catch(err){
    console.log('Error in searching user-controller****',err);
    return res.redirect('back');
  }

}

