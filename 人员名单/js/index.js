;
(function () {


    var stus = [];
    if (!localStorage.msg) {
        console.log("没数据");
    } else {
        console.log("有数据");
        stus = JSON.parse(localStorage.msg);
        xuanran(stus);
    }
    //添加信息
    $("#add").click(function () {
        if (!$("#name").val() || !$("#age").val()) {
            alert("姓名或年龄不能为空")
            return;
        }
        var obj = {
            name: $("#name").val(),
            age: $("#age").val()
        }
        stus.push(obj);
        // console.log(stus);
        localStorage.msg = JSON.stringify(stus);
        xuanran(stus);
    });
    //渲染信息模块
    function xuanran(array) {
        $("tbody").empty();
        var str = "";
        array.forEach(function (val, idx) {
            // console.log(val, idx);
            str += `<tr>
                    <td>${idx+1}</td>
                    <td>${val.name}</td>
                    <td>${val.age}</td>
                    <td>
                        <button class='btn changebtn' data-change ='${idx}'>修改</button>
                        <button class='btn del' data-del ='${idx}'>删除</button>
                    </td>
                    </tr>`
        });
        $("tbody").append(str);
        //删除当前行
        $(".del").click(function () {
            deltr($(this).attr("data-del"));
        });
        //修改当前行
        $(".changebtn").click(function (index) {
            change($(this).attr("data-change"));
            console.log(111)
        });
        clear();
    }
    //修改信息模块
    function change(index) {
        $("#add").addClass("add");
        $("#change").removeClass("change");
        $("#name").val(stus[index].name);
        $("#age").val(stus[index].age);
        $("#change").off();
        //确定修改信息
        $("#change").click(function () {
            $("#change").addClass("change");
            $("#add").removeClass("add");
            stus[index].name = $("#name").val();
            stus[index].age = $("#age").val();
            localStorage.msg = JSON.stringify(stus);
            xuanran(stus);
            // console.log(stus)
            // console.log(stus[index].name, stus[index].age);

        });
    }

    //删除当前行模块
    function deltr(index) {
        stus.splice(index, 1);
        localStorage.msg = JSON.stringify(stus);
        xuanran(stus);
    }
    //全部删除
    $("#delall").click(function () {
        delall();
    });
    //年龄排序
    $("#agepx").click(function () {
        stus = stus.sort(function (a, b) {
            return a.age - b.age;
        });
        // localStorage.msg = JSON.stringify(stus);
        console.log(stus);
        console.log(localStorage.msg);
        xuanran(stus);
    });
    // 全部删除模块
    function delall() {
        stus.splice(0, stus.length);
        localStorage.msg = JSON.stringify(stus);
        xuanran(stus);
    }
    //清空ipt信息模块
    function clear() {
        $("#name").val('');
        $("#age").val('');
    }

    // 开启移入变色
    $("#kqcolor").click(function () {
        $("#kqcolor").addClass("kq");
        $("#gbcolor").removeClass("gb");
        $("tbody").children().mouseenter(function () {
            $(this).addClass("tron").siblings().removeClass("tron");
        });
        $("tbody").children().mouseleave(function () {
            $("tbody").children().removeClass("tron");
        });
    });
    //关闭移入变色
    $("#gbcolor").click(function () {
        $("#kqcolor").removeClass("kq");
        $("#gbcolor").addClass("gb");
        $("tbody").children().mouseenter(function () {
            $("tbody").children().removeClass("tron");
        });
    });
    // 结束移入变色

    var trs = $("tbody").children();
    // 检索关键字
    $("#search").click(function () {
        trs.css("background", "")
        var keywords = $("#searchipt").val();
        trs.each(function () {
            var name = $(this).children().eq(1).html();
            // console.log($(this).children().eq(1).html());
            if (name.indexOf(keywords) != -1) {
                $(this).css("background", "orange");
            }
        });
    });
    // 重置
    $("#reset").click(function(){
        trs.css("background", "")
        $("#searchipt").val("");
    });

})();