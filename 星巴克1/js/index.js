;
(function () {
    //左侧菜单切换
    $(".menu").on("click", function () {
        $(".menu-list").stop().fadeIn(200).show();
    });
    $(".menu-list .menu").on("click", function () {
        $(".menu-list").stop().fadeOut(200).hide();
    });

    var i = 0;
    // var $width;
    var $width = $(".lunbo ul li").width();
    var length = $(".lunbo ul li").length;

    // setInterval(function () {
    // $width = $(".lunbo ul li").width();
    // console.log($width);
    // return $width;
    // }, 100);


    
    // 节流锁
    var lock = true;
    // console.log($width);
    function next() {
        if (lock) {
            // 加锁
            lock = false;
            if (i == length - 1) {
                $(".lunbo ul").css({
                    left: 0
                });
                i = 0;
            }
            i++;
            $(".lunbo ul").animate({
                left: -i * $width
            }, function () {
                // 解锁
                lock = true;
            });
        }

    }
    //点击下一张
    $(".next").on('click', function () {
        next();
    })
    //计时器3s执行一次
    var time = null;
    //自动轮播
    function autoplay() {
        time = setInterval(function () {
            next();
        }, 3000);
    }
    //停止轮播
    function stopplay() {
        clearInterval(time);
    }
    autoplay();
    //鼠标移入停止轮播
    $(".lunbo").on('mouseenter', function () {
        stopplay();
    });
    //鼠标移除开始轮播
    $(".lunbo").on('mouseleave', function () {
        autoplay();
    });


    var liwidth = $(".jt li").width();

    $(".jt .left").on('click', function () {
        var left = $(".jt ul").css("left");
        if (lock) {
            lock = false;

            $(".jt ul").animate({
                left: (parseInt(left) + liwidth + 16)
            }, function () {
                lock = true;
            });


            // console.log($(".jt ul").offSet());

        }
    });
    $(".jt .right").on('click', function () {
        var left = $(".jt ul").css("left");
        if (lock) {
            lock = false;
            $(".jt ul").animate({
                left: (parseInt(left) - liwidth - 16)
            }, function () {
                lock = true;
            });
            // console.log($(".jt ul").offsetLeft());
        }
        $(".jt .left").fadeIn().css("display", "block");
    });




    //footer点击效果
    var footerlis = $("#footer li");
    footerlis.on('click', function () {
        $(this).children().eq(0).addClass("active").removeClass("none").next().addClass("none").removeClass("active");
        $(this).siblings().children(".img1").addClass("none").removeClass("active");
        $(this).siblings().children(".img2").addClass("active").removeClass("none");
        $(this).addClass("color").siblings().removeClass("color");
    })
})();