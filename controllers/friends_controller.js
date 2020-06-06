const User = require('../models/user');
const Friendship = require('../models/friendships');

module.exports.friendreq = async function(req,res)
{
  try{ 
       let receiver = await User.findById(req.body.profile_user);
       let requestor = await User.findById(req.params.id);

       for(objid of receiver.friendRequest)
       {
         if(objid == requestor.id)
         {
           
           receiver.friendRequest.pull(requestor._id);
           receiver.save();

           req.flash('error','Unsend friend request');
           return res.redirect('back');
         } 
       }

       receiver.friendRequest.push(requestor._id);
       receiver.save();

       req.flash('success','Friend request sent');
       return res.redirect('back');

      }catch(err){
      console.log('Error in sending friend request',err);
      return res.redirect('back');
    }    
 }



 module.exports.friend = async function(req,res)
{
  
  try{
  
       let receiver = await User.findById(req.params.id); 
       let requestor = await User.findById(req.user._id);

       if(req.body.friend)
       {
         receiver.friendships.push(requestor._id);
         requestor.friendships.push(receiver._id);
         receiver.friendRequest.pull(requestor._id);

         receiver.save();
         requestor.save();
         
         req.flash('success','Friend request accepted');
         return res.redirect('back');
       
       }else if(req.body.reject){
         

         console.log('request.body.reject',req.body.reject);
         receiver.friendRequest.pull(requestor._id);  
         receiver.save();

         req.flash('success','Friend request Deleted');
         return res.redirect('back'); 
       }


   }catch(err){
      console.log('Error in accepting/deleting friend request',err);
      return res.redirect('back');
   }    
}


