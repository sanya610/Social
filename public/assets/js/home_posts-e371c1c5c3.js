{let n=function(){let n=$("#new-post-form"),s=document.querySelector("#new-post-form");n.submit((function(n){console.log("hello rishabh"),n.preventDefault(),formData=new FormData(s),$.ajax({type:"post",url:"/posts/create",processData:!1,contentType:!1,data:formData,success:function(n){console.log("hello rishabh"),$("#new-post-form textarea").val(""),$("#new-post-form input#post-pic").val("");let s=t(n.data.post);$("#posts-list-container>ul").prepend(s),e($(" .delete-post-button",s)),new PostComments(n.data.post._id),new ToggleLike($(" .toggle-like-button",s)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(n){console.log(n.responseText)}})}))},t=function(n){return n.pic?(console.log("found pic"),$(`<li id="post-${n._id}">               \n      <div class="main-post-div">  \n\n        <img src="${n.pic}">\n        <p>\n          <span id="post-content">${n.content}</span>\n          <br>\n          <small>\n            ${n.user.name}   \n          </small> \n        </p>\n       \n  \n        <div class="post-comments">\n\n          <form action="/comments/create" method="POST" id="new-comment-form">\n            <input type="text" name="content" placeholder="Type here to add comment.." required>\n            <input type="hidden" name="post" value="${n._id}">\n            \n            <button type="submit" class="Add-comment">\n                <i class="far fa-comment"></i>\n            </button>  \n          </form>\n          \n\n          <small id="like-post">\n              <a class="toggle-like-button" data-id="${n._id}" data-likes="${n.likes.length}" href="/likes/toggle/?id=${n._id}&type=Post">\n                      <span id="toggle-i-${n._id}">\n                          ${n.likes.length}&nbsp&nbsp<i class="far fa-heart"></i>\n                      </span>\n              </a>\n          </small>\n\n        \n          <span>  \n            <small>\n              <a class="delete-post-button" href="/posts/destroy/${n._id}">\n                <i class="fas fa-trash-alt"></i>\n              </a>\n            </small>\n          </span>  \n    \n    \n  \n          <div class="post-comments-list">\n            <ul id="post-comments-${n._id}">\n      \n            </ul>\n          </div> \n    \n      \n        </div>\n      </div>\n\n    </li>`)):(console.log("couldnt found pic"),$(`<li id="post-${n._id}">               \n      <div class="main-post-div">  \n\n        <p>\n          <span id="post-content">${n.content}</span>\n          <br>\n          <small>\n            ${n.user.name}   \n          </small> \n        </p>\n     \n\n        <div class="post-comments">\n\n          <form action="/comments/create" method="POST" id="new-comment-form">\n            <input type="text" name="content" placeholder="Type here to add comment.." required>\n            <input type="hidden" name="post" value="${n._id}">\n            \n            <button type="submit" class="Add-comment">\n                <i class="far fa-comment"></i>\n            </button>  \n          </form>\n          \n\n          <small id="like-post">\n              <a class="toggle-like-button" data-id="${n._id}" data-likes="${n.likes.length}" href="/likes/toggle/?id=${n._id}&type=Post">\n                      <span id="toggle-i-${n._id}">\n                          ${n.likes.length}&nbsp&nbsp<i class="far fa-heart"></i>\n                      </span>\n              </a>\n          </small>\n\n      \n          <span>  \n            <small>\n              <a class="delete-post-button" href="/posts/destroy/${n._id}">\n                <i class="fas fa-trash-alt"></i>\n              </a>\n            </small>\n          </span>  \n    \n  \n\n          <div class="post-comments-list">\n            <ul id="post-comments-${n._id}">\n      \n            </ul>\n          </div> \n    \n    \n        </div>\n      </div>\n    </li>`))},e=function(n){$(n).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(n).prop("href"),success:function(n){$("#post-"+n.data.post_id).remove(),new Noty({theme:"relax",text:"Post Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(n){console.log(n.responseText)}})}))},s=function(){$("#posts-list-container>ul>li").each((function(){let n=$(this),t=$(".delete-post-button",n);e(t);let s=n.prop("id").split("-")[1];new PostComments(s)}))};n(),s()}