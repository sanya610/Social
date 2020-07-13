// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })

            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                let id=$(self).attr("data-id");

                if (data.data.deleted == true){
                    likesCount -= 1;
                    
                    $(self).html(`<span id="toggle-i-${id}">${likesCount}&nbsp;&nbsp;<i class="far fa-heart"></span>`);
                    
                }else{
                    likesCount += 1;

                    // var elem = document.getElementById(`toggle-i-${id}`); 
                    // //toggle-i wali span nhi hai
                    // var x = elem.querySelector('i');

                    // x.classList.remove('far');
                    // x.classList.remove('fa-heart');

                    // //may be its occuring because of the order in which classes should be used 
                    // // no its not the reason//okay//do you get any output no
                    // x.classList.add('fas');
                    // x.classList.add('fa-heart');
                    // console.log('x',x);
                    //
                    $(self).html(`<span id="toggle-i-${id}">${likesCount}&nbsp;&nbsp;<i class="fas fa-heart"></span>`);

                }

                $(self).attr('data-likes', likesCount);

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}











