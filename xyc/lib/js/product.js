;(function () {
    var lis = $(".products").children();
    lis.on("click", function () {
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".product").children().eq(index).addClass("active").siblings().removeClass("active");
        $(".product-list").children().eq(index).addClass("active").siblings().removeClass("active")
    });


    $(window).on('scroll', function () {
        var $header = $("#header").height();
        var $navigation = $("#navigation").height();
        var $product = $("#product").height();
        var $top = $product - $header - $navigation;
        if ($(window).scrollTop() >= ($("#navigation").offset().top - $("#header").height())) {
            $("#navigation").css({
                position: "fixed",
                top: $("#header").height()
            });
            $("#header").addClass("after").removeClass("before").css({
                background: "white"
            });
        }
        if ($(window).scrollTop() <= $top) {
            $("#navigation").css({
                position: "relative",
                top: 0
            });
            $("#header").addClass("before").removeClass("after").css({
                background: "rgba(0,0,0,.4)"
            });
        }
    });

    

})();