;
(function () {
  //左侧导航显示关闭
  $("#header i").on('click', function () {
    $(".left-navigation").stop().removeClass("none").addClass("active");
  });
  $(".icontimes i").on('click', function () {
    $(".left-navigation").stop().removeClass("active").addClass("none");
  });

  //导航加粗
  $("#header li").on('click', function () {
    $(this).addClass("bold").siblings().removeClass("bold");
  });

  //右侧导航显示关闭
  $(".menu i").on('click', function () {
    $(".right-navigation").stop().removeClass("none").addClass("active");
  });
  $(".icontimes i").on('click', function () {
    $(".right-navigation").stop().removeClass("active").addClass("none");
  });




  var $lis = $(".right-navigation li");

  var $navigations = $("#navigation li");

  var $hardwares = $("#hardware").children();
  var $hardwarelists = $("#hardware-list").children();

  var $products = $("#product").children();
  var $productlists = $("#product-list").children();

  var $solutions = $("#solution").children();
  var $solutionlists = $("#solution-list").children();

  var $informations = $("#information").children();
  var $informationlists = $("#information-list").children();


  $lis.on('click', function () {
    var $index = $(this).index();
    $hardwares.eq($index).addClass("active").siblings().removeClass("active");
    $hardwarelists.eq($index).addClass("active").siblings().removeClass("active");


    $products.eq($index).addClass("active").siblings().removeClass("active");
    $productlists.eq($index).addClass("active").siblings().removeClass("active");


    $solutions.eq($index).addClass("active").siblings().removeClass("active");
    $solutionlists.eq($index).addClass("active").siblings().removeClass("active");

    $informations.eq($index).addClass("active").siblings().removeClass("active");
    $informationlists.eq($index).addClass("active").siblings().removeClass("active");


    $navigations.eq($index).addClass("active").siblings().removeClass("active");
    $(".right-navigation").addClass("none").removeClass("active");

  });
})();