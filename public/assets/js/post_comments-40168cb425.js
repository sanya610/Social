class PostComments{constructor(e){this.postId=e,this.postContainer=$("#post-"+e),this.newCommentForm=$(`#post-${e}-comments-form`),this.createComment(e);let t=this;$(".delete-comment-button",this.postContainer).each((function(){t.deleteComment($(this))}))}createComment(e){let t=this;this.newCommentForm.submit((function(n){n.preventDefault();$.ajax({type:"post",url:"/comments/create",data:$(this).serialize(),success:function(n){let o=t.newCommentDom(n.data.comment);$("#post-comments-"+e).prepend(o),t.deleteComment($(" .delete-comment-button",o)),new ToggleLike($(" .toggle-like-button",o)),new Noty({theme:"relax",text:"Comment published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}newCommentDom(e){return $(`<li id="comment-${e._id}">\n                    <p>\n                        <span id="comment-content" style="font-size: 1.3rem;">${e.content}</span> \n                            \n                        <br>\n                        <small style="color: dimgray;">\n                            ${e.user.name}  \n                        </small> \n                        <small id="like-comment">\n                            <a class="toggle-like-button" href="/likes/toggle/?id=${e._id}&type=Comment" data-likes="${e.likes.length}"  data-id="${e._id}" >\n                                  <span id="toggle-i-${e._id}">\n                                        ${e.likes.length} &nbsp&nbsp<i class="far fa-heart"></i>\n                                  </span>      \n                            </a> \n                        </small>\n                    \n                    \n                        <small>\n                            <a href="/comments/destroy/${e._id}"  class="delete-comment-button">\n                                <i class="fas fa-trash-alt"></i>\n                            </a>\n                        </small> \n                    </p>\n                </li>`)}deleteComment(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$("#comment-"+e.data.comment_id).remove(),new Noty({theme:"relax",text:"Comment Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}}