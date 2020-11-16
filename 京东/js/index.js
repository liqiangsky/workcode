var i = 0;
function lunbo (){
    $(".lbimg li").eq(i).stop(true).fadeIn(200).addClass("on").siblings().fadeOut(200).removeClass("on");
    $(".lbli li").eq(i).addClass("on").siblings().removeClass("on");

};
//鼠标移动小白点 
$(".lbli li").mouseenter(function () {
    i = $(this).index();
    lunbo();
});
//下一张图片
$(".right").click(function () {
    ++i > ($(".lbli li").length - 1) ? i = 0 : i;
    // console.log(i);
    lunbo();
});
//上一张图片
$(".left").click(function () {
    --i < 0 ? i = ($(".lbli li").length - 1) : i;
    lunbo();
});
//计时器 开始播放
var jsq = null;
function autoplay() {
    jsq = setInterval(function () {
        $(".right").click();
    }, 2000);
};
autoplay();
// 停止播放
function stopplay() {
    clearInterval(jsq);
};
$("#lbdiv").mouseover(function () {
    stopplay();
});
$("#lbdiv").mouseout(function () {
    autoplay();
});
var $arrs = ["超级品类日", "家具家装节", "玩音乐现场"];
var $links = ["http://www.baidu.com/", "http://www.sina.com/", "http://www.google.com/"];
var j = 0;
setInterval(function () {
    j = ++j > $arrs.length - 1 ? 0 : j;
    j = ++j > $links.length - 1 ? 0 : j;
    $(".li-bh").html($arrs[j]).attr("href", $links[j]);
}, 3000);