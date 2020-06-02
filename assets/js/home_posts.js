{
 //method to submit the form data for new post using ajax    
 let createPost = function()
 {
  let newPostForm = $('#new-post-form');
  
  newPostForm.submit(function(e){
    e.preventDefault();
    
    $.ajax({
      type: 'post',
      url : '/posts/create',
      data: newPostForm.serialize(),
      success: function(data)
      {
       let newPost = newPostDom(data.data.post);
       $('#posts-list-container>ul').prepend(newPost); 
       deletePost($(` .delete-post-button`,newPost));

      },error: function(error)
      {
       console.log(error.responseText);   
      }  
    });
  });
 }
  
 //method to create a post in DOM 
 let newPostDom = function(post)
 {
      return $(`<li id="post-${post._id}">         
     
      <p>
        ${post.content}
    
      
        <br>
        <small>
            ${post.user.name}   
        </small>  


        <small>
              <a class="toggle-like-button" data-likes="${post.likes.length}" href="/likes/toggle/?id=${post._id}&type=Post">
                ${post.likes.length} Likes
              </a>
        </small> 

      </p>

      <div class="post-comments">
   
           <form action="/comments/create" method="POST">
               <input type="text" name="content" placeholder="Type here to add comment.." required>
               <input type="hidden" name="post" value="${ post._id }">
               <input type="submit" value="Add Comment">
            </form>
    

        <div class="post-comments-list">
         <ul id="post-comments-${ post._id }">
           
        

         </ul>
        </div> 
      </div>
  </li>`)
 }

  //method to delete a post from DOM
  let deletePost = function(deleteLink)
  {
    $(deleteLink).click(function(e){
    
    e.preventDefault();
    
      $.ajax({
        type:'get',
        url: $(deleteLink).prop('href'),
        success: function(data)
        {
          $(`#post-${data.data.post_id}`).remove();
      
        },error: function(error)
        {
         console.log(error.responseText);
        }
      }) 
    })
  }





    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
  //   let convertPostsToAjax = function(){
  //     $('#posts-list-container>ul>li').each(function(){
  //         let self = $(this);
  //         let deleteButton = $(' .delete-post-button', self);
  //         deletePost(deleteButton);

  //         // get the post's id by splitting the id attribute
  //         let postId = self.prop('id').split("-")[1]
  //         new PostComments(postId);
  //     });
  // }



  createPost();
 // convertPostsToAjax();
}