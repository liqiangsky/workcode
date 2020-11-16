// $(window).scroll(function () {
//     var ultop = $("p:eq(1)").offset().top;
//     var htmltop = $("html").scrollTop();
//     // console.log("ul",ultop);
//     // console.log("html",htmltop);
//     if (htmltop >= ultop) {
//         $("#Side-navigation").fadeIn(200)
//     }else{
//         $("#Side-navigation").fadeOut(200)
//     }
//     $("li").last().one("click",function(){
//         $("html").animate({scrollTop:0},"linear");
//     });
// });





// $(window).scroll(function () {
//     if ($(document).scrollTop() >= $("p:eq(1)").offset().top) {
//         $("#Side-navigation").fadeIn(function () {
//             console.log("淡入...")
//         })
//         $("#Side-navigation").removeClass("hid")
//     } else {
//         $("#Side-navigation").fadeOut(function () {
//             console.log("淡出...")
//         })
//         $("#Side-navigation").addClass("hid")
//     }
//     $("li").last().one("click", function () {
//         $("html").animate({
//             scrollTop: 0
//         }, "linear");
//     });
// })










var obj ={};
var timer1 = timer2=null;
$(window).scroll(function(){
    if($(document).scrollTop() >= $("p:eq(1)").offset().top){
       clearTimeout(obj.timer1);
       clearTimeout(obj.timer2);
       obj.timer1 = setTimeout(function () {
        $("#Side-navigation").fadeIn(function(){
                console.log("淡入...")
            })
       },100)
    //    $("#Side-navigation").removeClass("a")
    }else{
        clearTimeout(obj.timer1)
        clearTimeout(obj.timer2)
        obj.timer2 = setTimeout(() => {
            $("#Side-navigation").fadeOut(function(){
                console.log("淡出...")
            })
        }, 100);
        // $("#Side-navigation").addClass("a")
    }
})

$("li").last().click(function () {
    $("html").animate({scrollTop:0},"linear")
})