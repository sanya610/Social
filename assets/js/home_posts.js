{
 //method to submit the form data for new post using ajax    
 let createPost = function()
 {
    let newPostForm = $('#new-post-form');

    let plain_form = document.querySelector('#new-post-form');

    newPostForm.submit(function(e){
    e.preventDefault();

    formData = new FormData(plain_form);
    
    $.ajax({
      type: 'post',
      url : '/posts/create',
      processData: false,
      contentType: false,
      data: formData,
      // data: newPostForm.serialize(),

      success: function(data)
      {
        $('#new-post-form textarea').val('');
         $('#new-post-form input#post-pic').val('');

        let newPost = newPostDom(data.data.post);
        $('#posts-list-container>ul').prepend(newPost); 
        deletePost($(` .delete-post-button`,newPost));

        // call the create comment class
        new PostComments(data.data.post._id);

        new ToggleLike($(' .toggle-like-button', newPost));

        new Noty({
            theme: 'relax',
            text: "Post published!",
            type: 'success',
            layout: 'topRight',
            timeout: 1500
            
        }).show();

      }, error: function(error){
          console.log(error.responseText);   
      }
    });
  });
 }


 //method to create a post in DOM 
 let newPostDom = function(post)
 {
   if(post.pic)
   {
    return $(`<li id="post-${post._id}">               
      <div class="main-post-div">  

        <img src="${post.pic}">
        <p>
          <span id="post-content">${post.content}</span>
          <br>
          <small>
            ${post.user.name}   
          </small> 
        </p>
       
  
        <div class="post-comments">

          <form action="/comments/create" method="POST" id="new-comment-form">
            <input type="text" name="content" placeholder="Type here to add comment.." required>
            <input type="hidden" name="post" value="${post._id}">
            
            <button type="submit" class="Add-comment">
                <i class="far fa-comment"></i>
            </button>  
          </form>
          

          <small id="like-post">
              <a class="toggle-like-button" data-id="${post._id}" data-likes="${post.likes.length}" href="/likes/toggle/?id=${post._id}&type=Post">
                      <span id="toggle-i-${post._id}">
                          ${post.likes.length}&nbsp&nbsp<i class="far fa-heart"></i>
                      </span>
              </a>
          </small>

        
          <span>  
            <small>
              <a class="delete-post-button" href="/posts/destroy/${post._id}">
                <i class="fas fa-trash-alt"></i>
              </a>
            </small>
          </span>  
    
    
  
          <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
      
            </ul>
          </div> 
    
      
        </div>
      </div>

    </li>`)
   } 

   else{  
    return $(`<li id="post-${post._id}">               
      <div class="main-post-div">  

        <p>
          <span id="post-content">${post.content}</span>
          <br>
          <small>
            ${post.user.name}   
          </small> 
        </p>
     

        <div class="post-comments">

          <form action="/comments/create" method="POST" id="new-comment-form">
            <input type="text" name="content" placeholder="Type here to add comment.." required>
            <input type="hidden" name="post" value="${post._id}">
            
            <button type="submit" class="Add-comment">
                <i class="far fa-comment"></i>
            </button>  
          </form>
          

          <small id="like-post">
              <a class="toggle-like-button" data-id="${post._id}" data-likes="${post.likes.length}" href="/likes/toggle/?id=${post._id}&type=Post">
                      <span id="toggle-i-${post._id}">
                          ${post.likes.length}&nbsp&nbsp<i class="far fa-heart"></i>
                      </span>
              </a>
          </small>

      
          <span>  
            <small>
              <a class="delete-post-button" href="/posts/destroy/${post._id}">
                <i class="fas fa-trash-alt"></i>
              </a>
            </small>
          </span>  
    
  

          <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
      
            </ul>
          </div> 
    
    
        </div>
      </div>
    </li>`)
   }
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
          new Noty({
            theme: 'relax',
            text: "Post Deleted",
            type: 'success',
            layout: 'topRight',
            timeout: 1500           

           }).show();
        },error: function(error){
            console.log(error.responseText);
        }
      }); 
    });
  }


   //loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
      $('#posts-list-container>ul>li').each(function(){
          let self = $(this);
          let deleteButton = $('.delete-post-button', self);
          deletePost(deleteButton);
          
          // get the post's id by splitting the id attribute
          let postId = self.prop('id').split("-")[1];
          new PostComments(postId);
          
      });
   }


  createPost();
  convertPostsToAjax();
}