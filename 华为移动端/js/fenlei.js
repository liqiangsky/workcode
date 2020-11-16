;
(function () {
$(".menu li").click(function(){
    var index = $(this).index();
    console.log(index);
    $(this).addClass("active").siblings().removeClass("active");
    $(".items .item").eq(index).addClass("active").siblings().removeClass("active");
});
})();