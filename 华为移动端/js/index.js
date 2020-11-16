;(function(){
var swiper1 = new Swiper('#swiper1', {
    loop: true, // 循环模式选项
    autoplay: true,
    pagination: {
        el: '.swiper-pagination',
    },
})
var swiper2 = new Swiper('#swiper2', {
    loop: true, // 循环模式选项
    pagination: {
        el: '.swiper-pagination',
    },
})
var swiper3 = new Swiper('#swiper3', {
    loop: true, // 循环模式选项
    direction: 'vertical', //垂直轮播
    autoplay: true,
})
var swiper4 = new Swiper('#swiper4', {
    slidesPerView: 4.5,
    slidesPerGroup: 1,
})
var swiper5 = new Swiper('#swiper5', {
    slidesPerView: 2.7,
    slidesPerGroup: 1,
})
var swiper6 = new Swiper('#swiper6', {
    slidesPerView: 2.7,
    slidesPerGroup: 1,
})
// var w = $(".swiper-slide").innerWidth();
// var index=0;
// $(".swiper-pagination").children().click(function(){
//     index = $(this).index();
//     $(this).addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active");
//     $(".swiper-wrapper").children().eq(index+1).addClass("swiper-slide-active").siblings().removeClass("swiper-slide-active").removeClass("swiper-slide-next");
//     $(".swiper-wrapper").children().eq(index+1).prev().addClass("swiper-slide-prev").siblings().removeClass("swiper-slide-prev");
//     $(".swiper-wrapper").children().eq(index+1).next().addClass("swiper-slide-next").siblings().removeClass("swiper-slide-next");
//     $(".swiper-wrapper").css({
//         "transform":`translate3d(${-w*(index+1)}px, 0px, 0px)`,
//         "transition":"all 300ms ease 0s"
//     });
//     return index;
// });
// function autoplay(){
//     index++;
//     console.log(index)
//     // if(index==7){
//     //     // index=1;
//     //     $(".swiper-wrapper").css({
//     //     "transform":`translate3d(720px, 0px, 0px)`,
//     //     // "transition":"all 300ms ease 0s"
//     // });
//     // }
//     // index=2;
//     $(".swiper-wrapper").css({
//         "transform":`translate3d(${-w*(index+1)}px, 0px, 0px)`,
//         "transition":"all 300ms ease 0s"
//     });
//     if(index>=$(".swiper-wrapper").children().length-2){
//         $(".swiper-wrapper").css("transform","translate3d(-720px, 0px, 0px)");
//     }
// };

// setInterval(autoplay,1000);
// var alp = 0;
// $(window).scroll(function () {
//     if ($(window).scrollTop() < $("header").innerHeight()) {
//         alp += 1 / $("header").innerHeight();
//         $(".header").css("background", `rgba(255,255,255,${alp})`);
//     }

// });
// 倒计时
var date2 = new Date("2020-10-10 00:00:00");

function date() {
    var date1 = new Date();
    var sjc = date2 - date1;
    var hour = parseInt(sjc / 1000 / 60 / 60);
    var hourhm = hour * 1000 * 60 * 60;
    var min = parseInt((sjc - hourhm) / (1000 * 60));
    var minhm = min * 1000 * 60;
    var sec = parseInt((sjc - hourhm - minhm) / 1000);
    var sechm = sec * 1000;
    var hm = sjc - hourhm - minhm - sechm;
    $("#time").html(`${zhuanhuan(hour)}:${zhuanhuan(min)}:${zhuanhuan(sec)}`);
}

function zhuanhuan(time) {
    return time < 10 ? "0" + time : time;
}
setInterval(date, 1000);
// 二级菜单下
$(".i-down").click(function () {
    $(".menu2").show();
    $(".mb").show();
});
// 二级菜单上
$(".i-up").click(function () {
    $(".menu2").hide();
    $(".mb").hide();
});
// 蒙版
$(".mb").click(function () {
    $(".menu2").hide();
    $(".mb").hide();
});
// 一级导航点击效果
$(".menu1").children("li").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
});
// 二级导航点击效果
$(".menu2-list").children().click(function () {
    $(this).addClass("active").siblings().removeClass("active");
});
})();
