;
(function () {
  var mySwiper = new Swiper('.swiper-container', {
    loop: true, // 循环模式选项
    autoplay: true,
    on: {
      autoplay: function () {
        lunbo();
      },
    }
  });
  var index;
  var lis = $(".banner-ul").children();
  lis.eq(0).children().css({
    width: "100%"
  });

  function lunbo() {
    index = $(".swiper-slide-active").attr("data-swiper-slide-index");
    lis.eq(index).children().stop().animate({
      width: "100%"
    }).parent().siblings().children().stop().animate({
      width: 0
    });
  }
  $("#swiper-wrapper").on("swipeLeft", function () {
    lunbo();
  });
  $(".swiper-wrapper").on("swipeRight", function () {
    lunbo();
  });
  $(window).scroll(function () {
    if ($(window).scrollTop() >= $("#swiper-container").height()-$("#header").height()) {
      $("#Contact-Us").addClass("active").removeClass("none");
      $("#header").addClass("after").removeClass("before").css({
        background: "white"
      });
    } 
    if ($(window).scrollTop() <= $("#swiper-container").height()-$("#header").height()) {
      $("#Contact-Us").removeClass("active").addClass("none");
      $("#header").addClass("before").removeClass("after").css({
        background: "rgba(0,0,0,.4)"
      });
    }
  });


  //联系我们---------------------------
  $(".online-message").on('click', function () {
    $(".ly").addClass("active").removeClass("none").css("z-index",99);
    // $(".Contact-Us").addClass("none").removeClass("active");
    $("#header").css("z-index",88);
  });
  $(".ly i").on('click', function () {
    $(".ly").addClass("none").removeClass("active").css("z-index",88);
    // $(".Contact-Us").removeClass("none").addClass("active");
    $("#header").css("z-index",99);
  });
  $(".contact-number").on('click', function () {
    $(".dh").addClass("active").removeClass("none").css("z-index",99);
    $("#header").css("z-index",88);
  });
  $(".dh i").on('click', function () {
    $(".dh").addClass("none").removeClass("active").css("z-index",88);
    $("#header").css("z-index",99);
  });
  //联系我们---------------------------


//   window.addEventListener("touchmove",function(event){ 
//     event.preventDefault();
//  },{ passive:false });
})();