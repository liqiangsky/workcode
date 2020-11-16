// var index = 0;
// ;
// (function () {
//     var len = $("li").length;
//     var w = window.innerWidth;
//     var lock = true;
//     var a;
//     // 右
//     $(".swiper-container").on("swipeLeft", function () {
//         index++;
//         if (index == len) {
//             $(".banner").css({
//                 left: 0
//             });
//             index = 1;
//         }
//         $(".banner").animate({
//             left: -index * w
//         });
//     });
//     //左
//     $(".swiper-container").on("swipeRight", function () {
//         index--;
//         if (index == -1) {
//             $(".banner").css({
//                 left: -(len - 1) * w
//             });
//             index = len - 2;
//         }
//         $(".banner").animate({
//             left: -index * w
//         });
//     });
// })();


;(function(){
    var mySwiper = new Swiper ('.swiper-container', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        
        // 如果需要分页器
        // pagination: {
        //   el: '.swiper-pagination',
        // },
        
        // 如果需要前进后退按钮
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // },
        
        // 如果需要滚动条
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
      })        
})();