// 0  1  2  3  4
var $width = 1000;
$("li").each(function(index){
    $(this).animate({
        left:index* $width / 5
    });
});
$("li").hover(function(){
    console.log($(this));
    // console.log(`rgba(${255},${0},${0})`);
    // console.log($(this).children(".zhezhao").css("background","red"));
    $(this).children(".zhezhao").css("background","rgba(0,0,0,0)")
},function(){
    $(".zhezhao").css("background","rgba(175, 57, 57, 0.3)")
});
$("li").mouseenter(function () {
    var $index = $(this).index();
    $(`li:lt(${$index+1})`).each(function (index) {
        // console.log(index);
        // console.log($(this));
        $(this).stop().animate({
            left: $(this).index() * $width / 5 / 2
        })
    })
    $(`li:gt(${$index})`).each(function (index) {
        console.log(index+$index);
        // console.log($(this));
        $(this).stop().animate({
            left: 600 + ($index + index) * $width / 5 / 2
        })
    })
    $("#box").mouseleave(function () {
        $("li").each(function (index) {
            $(this).stop().animate({
                left: $(this).index() * $width / 5
            });
        });
    });
});