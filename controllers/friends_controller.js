const User = require('../models/user');
const Friendship = require('../models/friendships');


module.exports.friendreq = async function(req,res)
{
  try{ 
       let receiver = await User.findById(req.body.profile_user);
       let requestor = await User.findById(req.user._id);
       var k=-1;
 
       for(objid of receiver.friendships)
       {
         if(objid == requestor.id)
         {
           k=1;
           if(req.xhr)
           {
            return res.status(200).json({
              data: {
                k: k
              },
              message: "Already a friend!"
            }); 
          }

          return res.redirect('back');
         } 
       }


       //unsend friend request and toggle button to send
       for(objid of receiver.friendRequest)
       {
         if(objid == requestor.id)
         {
            receiver.friendRequest.pull(requestor._id);
            receiver.save();
            k=2;
            
            if(req.xhr)
            {
              return res.status(200).json({
                data: {
                  k: k
                },
                message: "Unsend friend request!"
              }); 
            }

            return res.redirect('back');     
         } 
       }
      

         //send friend request and toggle button to unsend 
         receiver.friendRequest.push(requestor._id);
         receiver.save();      
         k=0;
        
         if(req.xhr)
          {
            return res.status(200).json({
              data: {
                k: k
              },
              message: "Friend request sent!"
            }); 
          }   
             
          return res.redirect('back');  
         
       
       
      }catch(err){
        console.log('Error in sending friend request',err);
        return res.redirect('back');
      }    
 }



module.exports.friend = async function(req,res)
{
    try{

       let requestor = await User.findById(req.params.id); 
       let receiver = await User.findById(req.user._id);
       
       if(req.body.friend)
       { 
         receiver.friendships.push(requestor._id);
         receiver.save();
         requestor.friendships.push(receiver._id);
         requestor.save();

         let friend1= await Friendship.create({
          to_user: req.user._id,
          from_user: req.params.id
        });
       
         await User.findByIdAndUpdate(receiver.id, {$pull : {friendRequest: requestor.id}});
          
         console.log(receiver.friendRequest);
         
         req.flash('success','Friend request accepted');
         return res.redirect('back');
       

       }else if(req.body.reject){
         
         console.log('request.body.reject',req.body.reject);
        
         await User.findByIdAndUpdate(receiver.id, {$pull : {friendRequest: req.params.id}});
         receiver.save();

         req.flash('success','Friend request Deleted');
         return res.redirect('back'); 
       }

      }catch(err){
        console.log('Error in accepting/deleting friend request',err);
        return res.redirect('back');
      }    
}



module.exports.remove_friend = async function(req,res)
{
  try{
      
      await User.findByIdAndUpdate(req.user._id, {$pull : {friendships: req.params.id}});
      await User.findByIdAndUpdate(req.params.id, {$pull : {friendships: req.user._id}});
      
      
      
      let friend= await Friendship.findOne({
        from_user : req.user._id,
        to_user : req.params.id
      });
  
      if(friend==null)
      {
        friend= await Friendship.findOne({
          from_user :req.params.id,
          to_user: req.user._id
        });
      }

      await Friendship.findByIdAndDelete(friend._id);
      let user = await User.findById(req.params.id);
      req.flash('error','Unfriended ',user.name);
      return res.redirect('back');

    }catch(err){
      console.log('Error in removing friend',err);
      return res.redirect('back');
    }   
}