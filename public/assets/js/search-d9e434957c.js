{let e=function(){let e=$("#new-search-form");e.submit((function(r){r.preventDefault(),$.ajax({type:"post",url:"/search",data:e.serialize(),success:function(e){for(i of($("#Search-container>ul").empty(),console.log("HEllo",e.data.result),e.data.result)){let e=n(i);$("#Search-container>ul").prepend(e)}},error:function(e){console.log(e.responseText)}})}))},n=function(e){return $(`       \n                      <li>   \n                         <p>\n                             <a href="/users/profile/${e._id}">${e.name}</a> \n                         </p>\n                      </li>  \n         \n        `)};e()}