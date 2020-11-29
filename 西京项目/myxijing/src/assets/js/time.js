export default {
  getTime: () => {
    return {



      //日期加上天数得到新的日期
      //dateTemp 需要参加计算的日期，days要添加的天数，返回新的日期，日期格式：YYYY-MM-DD
      getNewDay: (dateTemp, days) => {
        var dateTemp = dateTemp.split("-");
        var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式  
        var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
        var rDate = new Date(millSeconds);
        var year = rDate.getFullYear();
        var month = rDate.getMonth() + 1;
        if (month < 10) month = "0" + month;
        var date = rDate.getDate();
        if (date < 10) date = "0" + date;
        return (year + "-" + month + "-" + date);
      },


      //日期加上天数得到新的月份
      //dateTemp 需要参加计算的日期，month要添加的月份，返回新的日期，日期格式：YYYY-MM

      getNewMonth: (sourceDate, months) => {
        var date = new Date(sourceDate); //比如sourceDate传参“2019-03-31”
        var oldDate = date.getDate(); //获取原来的月有多少日
        date.setDate(1); //设置为1日（day）
        date.setMonth(date.getMonth() + months); //设置新的月份(从0开始)  months 传参-1
        var newDay = new Date(date.getYear(), date.getMonth() + 1, 0).getDate(); //获取新得到的月有多少日
        date.setDate(Math.min(oldDate, newDay));
        // console.log(date.toLocaleDateString()); // 2019/2/28
        var year = date.getFullYear();
        var month = date.getMonth() + months;
        // console.log(year + "-" + month)
        return (year + "-" + month);
      },

      //计算两个日期天数差
      days: function (day) {
        var time = Date.parse(new Date());
        var lasttime = Date.parse(day);
        var day = parseInt((time - lasttime) / (1000 * 60 * 60 * 24));
        return day
      },

      // 获取当天
      getCurrentDay: function () {
        var date = new Date()
        return date.Format("yyyy-MM-dd")
      },

      // 获取当天(中文格式 → 2019年03月02日)
      getCurrDayChinese: function () {
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        if (month < 10) {
          month = "0" + month
        }
        var day = date.getDate()
        if (day < 10) {
          day = "0" + day
        }
        return year + "年" + month + "月" + day + "日"
      },

      // 获取当月(日期格式 → 2019-03)
      getCurrMonthChinese: function () {
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        if (month < 10) {
          month = "0" + month
        }
        return year + "-" + month + ""
      },

      // 获取当月(中文格式 → 2019年03月)
      getCurrMonthChineses: function () {
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        if (month < 10) {
          month = "0" + month
        }
        return year + "年" + month + "月"
      },

      // 获取当月第一天
      getCurrentMonthFirst: function () {
        var date = new Date()
        date.setDate(1) //当月第一天
        return date.Format("yyyy-MM-dd")
      },

      // 获取当月最后一天
      getCurrentMonthLast: function () {
        var date = new Date()
        var currentMonth = date.getMonth()
        var nextMonth = ++currentMonth
        var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
        var oneDay = 1000 * 60 * 60 * 24
        return new Date(nextMonthFirstDay - oneDay).Format("yyyy-MM-dd")
      },

      // 依据传的日期获取星期
      getWeek: function (date) {
        var str = "星期"
        var week = new Date(date).getDay()
        switch (week) {
          case 0:
            str += "日"
            break
          case 1:
            str += "一"
            break
          case 2:
            str += "二"
            break
          case 3:
            str += "三"
            break
          case 4:
            str += "四"
            break
          case 5:
            str += "五"
            break
          case 6:
            str += "六"
            break
        }
        return str
      },

      // 读取从当天往回数多少天 day 不传值，默认往回数1天；传值的话，往回数day天
      daysJian: function (day) {
        var date = new Date() //获取当前时间
        if (day == undefined) {
          date.setDate(date.getDate() - 1) //设置天数 -1 天
        } else {
          date.setDate(date.getDate() - parseInt(day)) //设置天数 -1 天
        }
        return date.Format("yyyy-MM-dd")
      },

      // 读取从当天往后数多少天 day 不传值，默认往回数1天；传值的话，往回数day天
      daysJia: function (day) {
        var date = new Date() //获取当前时间
        if (day == undefined) {
          date.setDate(date.getDate() + 1) //设置天数 -1 天
        } else {
          date.setDate(date.getDate() + parseInt(day)) //设置天数 -1 天
        }
        return date.Format("yyyy-MM-dd")
      },

      // 设置日期天数增加或减少
      setDateJianOrJia: function (date, num) {
        var d = new Date(date)
        d.setDate(d.getDate() + num)
        var m = d.getMonth() + 1
        if (m < 10) {
          m = "0" + m
        }
        var day = d.getDate()
        if (day < 10) {
          day = "0" + day
        }
        return d.getFullYear() + '-' + m + '-' + day
      },

      // 设置月份增加或减少
      setMonthJianOrJia: function (yearMonthDay, monthNum) {
        var arr = yearMonthDay.split('-') //2020-08-19或2020-08
        var year = parseInt(arr[0])
        var month = parseInt(arr[1])
        month = month + monthNum
        if (month > 12) { //月份加
          var yearNum = parseInt((month - 1) / 12)
          month = month % 12 == 0 ? 12 : month % 12
          year += yearNum
        } else if (month <= 0) { //月份减
          month = Math.abs(month)
          var yearNum = parseInt((month + 12) / 12)
          year -= yearNum
        }
        month = month < 10 ? "0" + month : month
        return year + "-" + month
      },

      // 计算时间差(分钟)2020-08-17 - 2020-08-16
      getTimeSub: function (time1, time2) {
        if (time1 == "" || time2 == "") return ""

        //截取字符串，得到日期部分"2009-12-02",用split把字符串分隔成数组 
        var begin1 = time1.substr(0, 10).split("-")
        var end1 = time2.substr(0, 10).split("-")

        //将拆分的数组重新组合，并实例成化新的日期对象 
        var date1 = new Date(begin1[1] + - +begin1[2] + - +begin1[0])
        var date2 = new Date(end1[1] + - +end1[2] + - +end1[0])

        //得到两个日期之间的差值m，以分钟为单位
        //Math.abs(date2-date1)计算出以毫秒为单位的差值 
        //Math.abs(date2-date1)/1000得到以秒为单位的差值 
        //Math.abs(date2-date1)/1000/60得到以分钟为单位的差值 
        var m = parseInt(Math.abs(date2 - date1) / 1000 / 60)

        //小时数和分钟数相加得到总的分钟数 
        //time1.substr(11,2)截取字符串得到时间的小时数 
        //parseInt(time1.substr(11,2))*60把小时数转化成为分钟 
        var min1 = parseInt(time1.substr(5, 2)) * 60 + parseInt(time1.substr(8, 2))
        var min2 = parseInt(time2.substr(5, 2)) * 60 + parseInt(time2.substr(8, 2))

        //两个分钟数相减得到时间部分的差值，以分钟为单位 
        var n = min2 - min1

        //将日期和时间两个部分计算出来的差值相加，即得到两个时间相减后的分钟数 
        var minutes = m + n

        return minutes
      },

      // 获取实时时间 年月日星期时分秒 例如：2019年2月26日 星期二 20:00:52
      // dayTime: function (id) {
      dayTime: function () {
        // var inn = document.getElementById(id)
        var date = new Date()
        var month = date.getMonth() + 1
        var year = date.getFullYear()
        var day = date.getDate()
        var week = date.getDay()
        var hour = date.getHours()
        if (hour < 10) {
          hour = "0" + hour
        }
        var min = date.getMinutes()
        if (min < 10) {
          min = "0" + min
        }
        var sec = date.getSeconds()
        if (sec < 10) {
          sec = "0" + sec
        }
        var week1
        switch (week) {
          case 0:
            week1 = '星期日'
            break
          case 1:
            week1 = '星期一'
            break
          case 2:
            week1 = '星期二'
            break
          case 3:
            week1 = '星期三'
            break
          case 4:
            week1 = '星期四'
            break
          case 5:
            week1 = '星期五'
            break
          case 6:
            week1 = '星期六'
            break
        }
        // inn.innerHTML = year + '年' + month + '月' + day + '日   ' + week1 + '   ' + hour + ':' + min + ':' + sec
        const res = year + '年' + month + '月' + day + '日   ' + week1 + '   ' + hour + ':' + min + ':' + sec
        // console.log(res)
        return res
      }

    }
  }
}

// 对Date的原型进行改造
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
  return fmt
}