(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goodsItem/buypeople/buypeople"],{"0f41":function(t,e,n){"use strict";n.r(e);var a=n("fa27"),o=n("ecaa");for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);n("ca14");var c,i=n("f0c5"),f=Object(i["a"])(o["default"],a["b"],a["c"],!1,null,"1ab4a23a",null,!1,a["a"],c);e["default"]=f.exports},ca14:function(t,e,n){"use strict";var a=n("f582"),o=n.n(a);o.a},e4bf:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;getApp();var n={data:function(){return{is_open:!1}},components:{},props:{data:{type:Object}},beforeMount:function(){this.setData({is_open:t.getStorageSync("Config").is_stock})},methods:{go:function(){wx.navigateTo({url:"/pages/goodsItem/buypeopleDetail/buypeopleDetail/buypeopleDetail?id=".concat(this.goodsid)})}}};e.default=n}).call(this,n("543d")["default"])},ecaa:function(t,e,n){"use strict";n.r(e);var a=n("e4bf"),o=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);e["default"]=o.a},f582:function(t,e,n){},fa27:function(t,e,n){"use strict";var a,o=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return a}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/goodsItem/buypeople/buypeople-create-component',
    {
        'pages/goodsItem/buypeople/buypeople-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0f41"))
        })
    },
    [['pages/goodsItem/buypeople/buypeople-create-component']]
]);
