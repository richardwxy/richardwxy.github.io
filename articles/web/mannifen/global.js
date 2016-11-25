/**
 * wap公共js
 * Created by zbk on 2014/12/18.
 */
var pageSize = 10;
$(function () {
    WXUtil.hideOptionMenu();
    //进入页面积分进度条
    function tree() {
        var inputsvalue = $("input.jifen-value"), totalValue = $('input.jifen-total').val();

        function value() {
            var width = parseInt(inputsvalue.val()) / totalValue * 110;
            var speed = parseInt(inputsvalue.val()) / totalValue * 2000;
            $('span.jifen').append('<i class="group-value">' + inputsvalue.val() + '</i>');
            if (width > 110) {
                inputsvalue.siblings('span').children('b').animate({width: 109}, 1500);
            } else {
                inputsvalue.siblings('span').children('b').animate({width: width}, speed);
            }
        }

        value();
    }

    $(window).load(function () {
        tree();
    });

    //已注册未关注公众号弹窗
    $('ul.menu .forbid').on('click', function () {
        var wHeight = $(document).height();
        $('div.c-mark').height(wHeight).show();
        $('div.group-dialog').show();
        return false;
    });

    //禁止注册时底部固定层移上去挡住输入框
    function fnPositionType() {
        var top = $(document).height() - 48;
        var top1 = $(window).height() - 48;
        $('.m-register .m-main input[type="tel"],.m-register .m-main .code').focus(function () {
            $('footer').css({'position': 'absolute', 'top': top});
        });
        $('.m-register .m-main input[type="tel"],.m-register .m-main .code').blur(function () {
            $('footer').css({'position': 'fixed', 'top': top1});
        });
    }

    fnPositionType();


});
/**
 * 公共的，弹出层出现时禁止背景层划动
 * @param d  传入弹出层id调用即可
 */
function forbidBackgroundScroll(d){
    $(d).bind("touchmove",function(e){
        e.preventDefault();
    });
}
// 检查是否为正数
function isUnsignedNumeric(val) {
    var newPar = /^\d+(\.\d+)?$/;
    return newPar.test(val);
}
// 判断一个值是否为空字符串
function isEmpty(val) {
    var flag = false;
    val = val.replace(/^\s+|\s+$/g, '');
    if (val == "") {
        flag = true;
    }
    return flag;
}
//检查是否为正确的手机号码格式
function isMobile(val){
    var patrn = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
    if (!patrn.exec(val)){
        return true;
    }
    return false;
}

/**
 * 时间戳转换
 * @param timestamp
 * @returns {string}
 */
function timestampTransdate(timestamp) {
    var time = new Date(timestamp)
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    month = parseInt(month) < 10 ? month = '0' + month : month;
    var date = time.getDate();
    date = parseInt(date) < 10 ? date = '0' + date : date;
    var hours = time.getHours();
    hours = parseInt(hours) < 10 ? hours = '0' + hours : hours;
    var minutes = time.getMinutes();
    minutes = parseInt(minutes) < 10 ? minutes = '0' + minutes : minutes;
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes;
}

function timestampTransdateFmtYMD(timestamp) {
    var time = new Date(timestamp)
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    month = parseInt(month) < 10 ? month = '0' + month : month;
    var date = time.getDate();
    date = parseInt(date) < 10 ? date = '0' + date : date;
    var hours = time.getHours();
    hours = parseInt(hours) < 10 ? hours = '0' + hours : hours;
    var minutes = time.getMinutes();
    minutes = parseInt(minutes) < 10 ? minutes = '0' + minutes : minutes;
    return year + "." + month + "." + date ;
}
//转化为元
function transformChief(val) {
    val = typeof val === 'undefined' ? 0 : val;
    return (parseFloat(val) / 100).toFixed(2);
}


/**
 * 判断日期（今天 昨天 前天）
 * @param createTime
 * @returns {string}
 */
function dateUtil(createTime){
    var time = createTime.substring(0, 16);
    var yyyy = time.substring(0, 4);
    var mm = time.substring(5, 7);
    var dd = time.substring(8, 10);
    var mmss = time.substring(11,16);
    var timeStr=yyyy+mm+dd;
    var beforeyesterday=GetDateStr(-2);
    var yesterday=GetDateStr(-1);
    var Today=GetDateStr(0);
    if(parseInt(timeStr)==parseInt(beforeyesterday)){
        return "前天 "+mmss;
    }else if(parseInt(timeStr)==parseInt(yesterday)){
        return "昨天 "+mmss;
    }else if(parseInt(timeStr)==parseInt(Today)){
        return "今天 "+mmss;
    }else{
        return time;
    }
}

/**
 * 获取日期
 * @param AddDayCount
 * @returns {string}
 * @constructor
 */
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    if(m<10){
        m="0"+m;
    }
    var d = dd.getDate();
    if(d<10){
        d="0"+d;
    }
    return y+m+d;
}


Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}