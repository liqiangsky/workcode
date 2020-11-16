;(function () {
    var lis = $(".informations").children();
    lis.on("click", function () {
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".information").children().eq(index).addClass("active").siblings().removeClass("active");
        $(".information-list").children().eq(index).addClass("active").siblings().removeClass("active");
    });
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= ($("#navigation").offset().top - $("#header").height())) {
            $("#navigation").css({
                position: "fixed",
                top: $("#header").height()
            });
        } 
        if ($(window).scrollTop() <= ($(".information").children(".active").height()+$(".kb").height()-$("#navigation").height()-$("#header").height())) {
            $("#navigation").css({
                position: "relative",
                top: 0
            });
        }
    });
})();