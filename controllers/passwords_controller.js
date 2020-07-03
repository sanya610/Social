const reset_password_token = require('../models/reset_password_token');
const User = require('../models/user');

const reset_password_mailer = require('../mailers/reset_password_mailer');
const queue = require('../config/kue');
const reset = require('../workers/reset_password_worker');
const crypto = require('crypto');



module.exports.openmail = function(req,res)
{
    return res.render('verify_email',{
    title: 'verify email'
   });  
}


module.exports.verifymail = async function(req,res)
{
  console.log('hello');
 try{
   
  let user = await User.findOne({email : req.body.email});

  console.log(user);

  if(user)
  {
    let change = await reset_password_token.create({
      accessToken: crypto.randomBytes(20).toString('hex'),
      isValid: true,
      user: user._id
    });  


    change = await change.populate('user', 'name email').execPopulate();

    let job = queue.create('emails1',change).save(function(err){
    if(err){ 
      console.log('Error in creating a queue');
      return;
    } 
              
    console.log('job enqueued !',job.id);
   });

   req.flash('success','Verification mail sent');
   return res.redirect('/users/sign-in');
  }

  else
  {
    return res.redirect('/users/sign-in');   
  }      

 }catch(err)
 {
  console.log('Error in sending mail',err);
  return;
 } 
}




module.exports.resetPassword =async function(req,res)
{
 try{
  let change = await reset_password_token.findOne({accessToken: req.params.accessToken});

  console.log('access Token :',change.accessToken);

 if(change)
 {
  if(change.isValid == true)
  { 
    console.log('change', change.isValid);

    //reset = await reset.populate('user', 'name email password').execPopulate();
     if(req.body.password == req.body.confirm_password)
     { 
      let user =await  User.findByIdAndUpdate(change.user,{password:req.body.password});
      //let user= await User.findOneAndUpdate({email:reset.user.email},{password:req.body.password});
    
      req.flash('success','New password updated');
      return res.redirect('/users/sign-in');

    }else{
       req.flash('failure','password and confirm password does not match');
       return res.redirect('/users/sign-in');
    }
  
  }else
  {
    return res.status(422).json({message: 'Token Expired'});
  }  
 }
}catch(err)
{
  console.log(err,'error');
}
}
