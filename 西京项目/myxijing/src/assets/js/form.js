import { Message } from 'element-ui';

export default {
  formValidate: () => {
    return {

      // 手机号码
      Phone: (rule, value, callback) => {
        let phone = /^1[3456789]\d{9}$/
        if (!phone.test(value) && value) {
          callback(new Error('请输入正确的手机号码'))
        } else {
          callback()
        }
      },

      // 身份证号
      IdCard: function (rule, value, callback) {
        if (!IdCardValidate(value.replace(/[, ]/g, ''))) {
          callback(new Error('请输入正确的身份证号'))
        } else {
          callback()
        }
      },

      // 邮箱
      Email: function (rule, value, callback) {
        let email = /^(\w+\.?)*\w+@(?:\w+\.)\w+$/
        if (!email.test(value) && value) {
          callback(new Error('请输入正确的邮箱'))
        } else {
          callback()
        }
      },
      
      // 判断开始日期和结束日期（表单校验）
      CompareDateForm:function(StartDate, EndDate) {
        console.log(StartDate,EndDate)
        var StartDay = StartDate == null ? "" : StartDate
        var EndDay = EndDate == null ? "" : EndDate
        console.log(StartDay,EndDay)
        if (StartDay != "" && EndDay != "" && ((StartDay.replace(/-/g,"")) > (EndDay.replace(/-/g,"")))) {
          return false
        } else {
          return true
        }
      },


      // 判断开始日期和结束日期
      CompareDate:function(StartDate, EndDate) {

        console.log(StartDate,EndDate)
        var StartDay = StartDate == null ? "" : StartDate
        var EndDay = EndDate == null ? "" : EndDate
        console.log(StartDay,EndDay)

        // if(StartDay == "" && EndDay != ""){
        //   Message.warning("请选择开始日期！")
        //   return false
        // }else if(StartDay != "" && EndDay == ""){
        //   Message.warning("请选择结束日期！")
        //   return false
        // }else

        if (StartDay != "" && EndDay != "" && ((StartDay.replace(/-/g,"")) > (EndDay.replace(/-/g,"")))) {
          Message.warning("开始日期不能大于结束日期！")
          return false
        } else {
          return true
        }

      },

      // 设置选择日期不能大于当天
      SetPickerDisabled() {
        return {
          disabledDate(time) {
            // return time.getTime() < Date.now() - 8.64e7 // 当天之后的时间可选
            // return time.getTime() > Date.now() - 8.64e7// 当天之前的时间可选
            // return time.getTime() > Date.now() // 当天之前的时间可选---不包括当天

            var date = new Date(getCurrMonthChinese() + ' 00:00:00:000')
            var thatDay = date.getTime()
            return time.getTime() < thatDay || time.getTime() > Date.now()
          }
        }
      },

      // 数字转金额格式(千分位)
      FormatNumMoney:function(row, column, cellValue){
        // console.log(cellValue)
        if(cellValue!=null){
          cellValue += ''
          if (!cellValue.includes('.')) cellValue += '.'
          return cellValue.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
            return $1 + ','
          }).replace(/\.$/, '')
        }
      },

      // 金额（保留两位小数）
      Money: function (rule, value, callback) {
        let money = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        if (!money.test(value) && value) {
          return callback(new Error('请输入正确的金额'))
        } else {
          callback()
        }
      },
      
      // 组织代码机构
      IsOrg: function (rule, value, callback) {
        let reg = /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/
        if (!reg.test(value) && value) {
          return callback(new Error('请输入正确组织机构代码'))
        } else {
          callback()
        }
      },

    }

  }
}

// 获取当月(日期格式 → 2019-03)
var getCurrMonthChinese = function() {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  if(month < 10) {
    month = "0" + month
  }
  return year + "-" + month + ""
}


//验证身份证号
var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];    // 加权因子   
var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];            // 身份证验证位值.10代表X   
function IdCardValidate(idCard) {
    idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格                     
    if (idCard.length == 15) {
        return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证    
    } else if (idCard.length == 18) {
        var a_idCard = idCard.split("");                // 得到身份证数组   
        if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
/**  
 * 判断身份证号码为18位时最后的验证位是否正确  
 * @param a_idCard 身份证号码数组  
 * @return  
*/
function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0;                             // 声明加权求和变量   
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作   
    }
    for (var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i];            // 加权求和   
    }
    let valCodePosition = sum % 11;                // 得到验证码所位置   
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}
/**  
 * 验证18位数身份证号码中的生日是否是有效生日  
 * @param idCard 18位书身份证字符串  
 * @return  
*/
function isValidityBrithBy18IdCard(idCard18) {
    var year = idCard18.substring(6, 10);
    var month = idCard18.substring(10, 12);
    var day = idCard18.substring(12, 14);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题   
    if (temp_date.getFullYear() != parseFloat(year)
        || temp_date.getMonth() != parseFloat(month) - 1
        || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}
/**  
 * 验证15位数身份证号码中的生日是否是有效生日  
 * @param idCard15 15位书身份证字符串  
 * @return  
*/
function isValidityBrithBy15IdCard(idCard15) {
  var year = idCard15.substring(6, 8);
  var month = idCard15.substring(8, 10);
  var day = idCard15.substring(10, 12);
  var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
  // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
  if (temp_date.getYear() != parseFloat(year)
    || temp_date.getMonth() != parseFloat(month) - 1
    || temp_date.getDate() != parseFloat(day)) {
    return false;
  } else {
    return true;
  }
}

//去掉字符串头尾空格   
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}