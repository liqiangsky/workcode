;
(function () {
    $(".header .menu .fa-bars").click(function () {
        $(this).next().stop(true).slideToggle();
    });
    // var lock =true;
    $(window).scroll(function(){
        // lock =false;
        if($(window).scrollTop()>150){
            $(".top").stop(true).fadeIn(200);
            // lock = true;
        }else{
            $(".top").stop(true).fadeOut(200);
            // lock = true;
        }
    });
    var root = $("html,body");
    $(".top").click(function(){
        root.animate({
            scrollTop:0
        },500);
        return false;
        
    });
})();