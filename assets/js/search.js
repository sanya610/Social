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
           console.log('HEllo',data.data.result);

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
         return $(`       
                      <li>   
                         <p>
                             <a href="/users/profile/${search._id}">${search.name}</a> 
                         </p>
                      </li>  
         
        `)
    }
   

   createSearch();
}