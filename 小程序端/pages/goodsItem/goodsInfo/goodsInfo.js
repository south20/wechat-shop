(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goodsItem/goodsInfo/goodsInfo"],{"5cad":function(t,e,n){"use strict";n.r(e);var a=n("e3dc"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},b169:function(t,e,n){"use strict";n.r(e);var a=n("e4ad"),o=n("5cad");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("bee4");var r,u=n("f0c5"),c=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,"6e4453e4",null,!1,a["a"],r);e["default"]=c.exports},b937:function(t,e,n){},bee4:function(t,e,n){"use strict";var a=n("b937"),o=n.n(a);o.a},e3dc:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("1be5"),o=(getApp(),{data:function(){return{startTime:"",sendTime:"",endTime:"",is_open:!1}},components:{},props:{data:{type:Object}},watch:{data:{handler:function(t){0!=t.start_time&&t.hasOwnProperty("send_time")&&this.setData({startTime:(0,a.formatTime)(1e3*t.start_time,"MM月dd日"),sendTime:(0,a.formatTime)(1e3*t.send_time,"MM月dd日")})},immediate:!0,deep:!0}},beforeMount:function(){this.setData({is_open:t.getStorageSync("Config").is_stock})},methods:{}});e.default=o}).call(this,n("543d")["default"])},e4ad:function(t,e,n){"use strict";var a,o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/goodsItem/goodsInfo/goodsInfo-create-component',
    {
        'pages/goodsItem/goodsInfo/goodsInfo-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b169"))
        })
    },
    [['pages/goodsItem/goodsInfo/goodsInfo-create-component']]
]);
