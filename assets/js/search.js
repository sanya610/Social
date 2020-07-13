{
    //method to submit the form data for new post using ajax    
    let createSearch = function()
    {
     let newSearchform = $('#new-search-form');
     
     newSearchform.submit(function(e){
       e.preventDefault();
       
       $.ajax({
         type: 'post',
         url : '/search',
         data: newSearchform.serialize(),
         success: function(data)
         {
           $('#Search-container>ul').empty();

           for(i of data.data.result){ 
              let newSearch = newSearchDom(i);
              $('#Search-container>ul').prepend(newSearch); 
           }
   
         },error: function(error)
         {
          console.log(error.responseText);   
         }  
       });
     });
    }
     


    //method to create a post in DOM 
    let newSearchDom = function(search)
    { 
         if(search.avatar)
         {
          return $(`<li>
                      <p>
                        <img src="${search.avatar}" style="width: 25px; height: 25px; border-radius: 4px;">  
                        <a href="/users/profile/${search._id}" style="color: black;">${search.name}</a> 
                      </p>
                  </li>  
            `)
         }
         else
         {
          return $(`<li>
                      <p>
                        <i class="fas fa-user-friends"  style="font-size: 20px; border-radius: 4px;"></i>
                        <a href="/users/profile/${search._id}" style="color: black;">${search.name}</a> 
                      </p>
                  </li>  
            `)
         }    
    }
   

  createSearch();
}