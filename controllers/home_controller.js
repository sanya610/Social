const User = require('../models/user');
const Post = require('../models/post');


//Using async await

module.exports.home = async function(req, res){
    
     try{
        // populate the user of each post
        let posts = await Post.find({})
        .populate('user')
        .sort('-createdAt')
        .populate({
          path: 'comments',
          populate:{
           path:'user'   
          }  
        }); 

        //.exec(function(err, posts){
        let users = await User.find({});
  
            return res.render('home', {
              title: "Codeial | Home",
              posts:  posts,
              all_users: users
            });
     
      }catch(err){
        console.log('Error',err);
        return;
      }
}
     
