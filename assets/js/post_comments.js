// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX



class PostComments
{
    // constructor is used to initialize the instance of the class whenever a new instance is created
        constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $('.delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));
                    new ToggleLike($(' .toggle-like-button', newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
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


    newCommentDom(comment){
        return $(`<li id="comment-${comment._id}">
                    <p>
                        <span id="comment-content" style="font-size: 1.3rem;">${comment.content}</span> 
                            
                        <br>
                        <small style="color: dimgray;">
                            ${comment.user.name}  
                        </small> 
                        <small id="like-comment">
                            <a class="toggle-like-button" href="/likes/toggle/?id=${comment._id}&type=Comment" data-likes="${comment.likes.length}"  data-id="${comment._id}" >
                                  <span id="toggle-i-${comment._id}">
                                        ${comment.likes.length} &nbsp&nbsp<i class="far fa-heart"></i>
                                  </span>      
                            </a> 
                        </small>
                    
                    
                        <small>
                            <a href="/comments/destroy/${comment._id}"  class="delete-comment-button">
                                <i class="fas fa-trash-alt"></i>
                            </a>
                        </small> 
                    </p>
                </li>`);
    }



    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
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
}