var WXUtil = {
    root: "",
    setPrefix: function (root) {
        this.root = root;
    },
    /**
     *获取url上面的参数值
     *name 参数名
     *return 参数值
     */
    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    },
    //隐藏网页右上角按钮
    hideOptionMenu: function () {
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            WeixinJSBridge.call('hideOptionMenu');
        });
    },
    //显示网页右上角按钮
    showOptionMenu: function () {
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            WeixinJSBridge.call('showOptionMenu');
        });
    },
    //隐藏网页底部导航栏
    hideToolbar: function () {
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            WeixinJSBridge.call('hideToolbar');
        });
    },
    //显示网页底部导航栏
    showToolbar: function () {
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            WeixinJSBridge.call('showToolbar');
        });
    },
    //关闭当前显示页面
    closeWxWindow: function () {
        WeixinJSBridge.call('closeWindow');
    },
    //获取网络状态
    /**
     *network_type:wifi wifi网络
     *network_type:edge 非wifi,包含3G/2G
     *network_type:fail 网络断开连接
     *network_type:wwan（2g或者3g）
     *
     */
    getNetworkType: function () {
        WeixinJSBridge.invoke('getNetworkType', {},
            function (e) {
                return e.err_msg;
            });
    },
    /**
     *判断是否是微信浏览器
     * @author Bill
     * @version 1.0
     * @Since  2013-12-18
     */
    isWeixin: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    },
    /**
     *判断是否是iPhone手机
     * @author Bill
     * @version 1.0
     * @Since  2013-12-18
     */
    isIphone: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/iPhone/i) == "iphone") {
            return true;
        } else {
            return false;
        }
    },

    /**
     *判断是否是Android手机
     * @author Bill
     * @version 1.0
     * @Since  2013-12-18
     */
    isAndroid: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/Android/i) == "android") {
            return true;
        } else {
            return false;
        }
    },
    /**
     *判断浏览器是否支持本地存储
     */
    isStorage: function () {
        if (window.localStorage)return true;
        return false;
    },
    /**
     *设置本地存储值
     *
     */
    setStorage: function (key, value) {
        localStorage[key] = value;
        return localStorage;
    },
    /**
     * 设置本地存储值
     */
    getStorage: function (key) {
        return localStorage[key];
    },
    /**
     *检测key对应的值是否和被检测值相同
     */
    testStorage: function (key, testValue) {
        var key_value = localStorage[key];
        if (checkMParam(testValue) && key_value === testValue)return true;
        return false;
    },
    /**
     *监测参数
     */
    checkMParam: function (value) {
        if (value != null && value != undefined && value != "" && value != "null" && value != "NULL" && value != "undefined" && value != "UNDEFINED") {
            return true;
        }
        return false;
    },
    //判断微信版本号是否大于5.2
    checkWxVersion: function () {
        var ua = navigator.userAgent;
        var index = ua.indexOf("MicroMessenger");
        if (index > -1) {
            var substr = ua.substr(index);
            substr = substr.replace("MicroMessenger/");
            if (substr > "5.2") {
                return true;
            }
            return false;

        } else {
            return false;
        }
    },
    getOpenId: function (appid) {
        var redirect_uri = window.location.href;
        //微信授权的固定url
        var wx_oauth2_url = document.getElementById('WX_AUTHORIZE_URL').value;
        var param = "?appId=" + appid + "&scope=snsapi_base&state=123&url=" + encodeURIComponent(redirect_uri);
        var url = wx_oauth2_url + param;
        window.location.href = url;
        return true;
    },
    getParamenter: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
}