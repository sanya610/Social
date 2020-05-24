const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = function(req,res)
{
  User.findById(req.params.id,function(err,user)
  {
    return res.render('user_profile', {
      title: 'User Profile',
      profile_user: user
     });
  })
}  


module.exports.update = async function(req,res)
{
  
  if(req.user.id == req.params.id)
  {
   try{
       //find the user
       let user = await User.findById(req.params.id);

       //update
       User.uploadedAvatar(req,res,function(err){
         if(err){
           console.log('***Multer Error',err);
         }
          
         user.name = req.body.name;
         user.email = req.body.email;

         //this is saving the path of uploaded file into the avatar field in the user
         if(req.file)
         {

          if(fs.existsSync(path.join(__dirname,'..',user.avatar)) && user.avatar)
          {
           //we will be deleting from path
           fs.unlinkSync(path.join(__dirname,'..',user.avatar));
           
          } 
        
          user.avatar = User.avatarPath + '/' + req.file.filename;
          
         }

         user.save();
         return res.redirect('back'); 
       });

      }catch(err)
      {
       req.flash('Error',err);
       return res.redirect('back'); 
      }  
  
  }else{
    req.flash('Error','Unauthorized!');
    return res.status(401).send('unauthorized!');
  }  
}



//render the sign-up page
module.exports.signUp = function(req,res)
{
  if(req.isAuthenticated()){
   return res.redirect('/users/profile');  
  }

  return res.render('user_sign_up',{
    title: 'SocialApp | Sign Up' 
  })
}



//render the sign-in page
module.exports.signIn = function(req,res)
{
  if(req.isAuthenticated())
  {
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_in',
  {
   title: 'SocialApp | Sign-In' 
  }) 
}



// get the sign up data
module.exports.create = function(req,res)
{
 if(req.body.password!=req.body.confirm_password)
 {
  return res.redirect('back'); 
 }
 
 User.findOne({email : req.body.email},function(err,user)
 {
  if(err)
  {
   console.log('Error in finding user in Signing up');
   return; 
  } 

  if(!user){
   User.create(req.body,function(err,user)
   {
    if(err)
    {
     console.log('Error in creating user while signing up');
     return; 
    }
     return res.redirect('/users/sign-in'); 
   }) 
  }else{
    return res.redirect('back'); 
  }
 })
}



//sign in and create session for the user
module.exports.createSession = function(req,res)
{
 req.flash('success', 'Logged in successfully');
 
 return res.redirect('/');
}



module.exports.destroySession = function(req,res)
{
 req.logout();
 
 req.flash('success','You have logged out');

 return res.redirect('/');
}









