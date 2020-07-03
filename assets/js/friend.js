{
   let friendcheck = function()
   {
     console.log('function is called');

     let isfriendForm = $('#is_friend_form');
      isfriendForm.submit(function(e){
        e.preventDefault();
        

        $.ajax({
            type: 'post',  
            url : '/isfriend',
            data: isfriendForm.serialize(),

            success: function(data)
            {
                let newk = data.data.k;   
                let but1 = $('#friend-button');

                if(newk==0)
                {
                    but1.html("Unsend");
                    $('#friend-button').css({"background-color":"rgb(169, 4, 65)", "color":"white"});
                    new Noty({
                        theme: 'relax',
                        text: "Request send",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 100           
                      }).show();
                }
                 

                else if(newk==1)
                {
                    but1.html("Friends");
                    $('#friend-button').css({"background-color":"rgb(7, 99, 102)", "color":"white"});
                    new Noty({
                        theme: 'relax',
                        text: "Already Friends",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 100           
                      }).show();
                }
                     
              
                else if(newk==2)
                {
                    but1.html("Req send");
                    $('#friend-button').css({"background-color":"rgb(41, 116, 72)", "color":"white"});
                    new Noty({
                        theme: 'relax',
                        text: "Unsend request",
                        type: 'error',
                        layout: 'topRight',
                        timeout: 100           
                      }).show();
                }
                
                
             
             },error: function(error)
            {
             console.log(error.responseText);   
            }
          });
        });
    }

   friendcheck();
}