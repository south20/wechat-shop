(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["bargaining/pages/goodItem/footer/footer"],{"17e8":function(e,t,n){"use strict";var a,i=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return a}))},2346:function(e,t,n){"use strict";n.r(t);var a=n("9937"),i=n.n(a);for(var u in a)"default"!==u&&function(e){n.d(t,e,(function(){return a[e]}))}(u);t["default"]=i.a},"4e88":function(e,t,n){"use strict";n.r(t);var a=n("17e8"),i=n("2346");for(var u in i)"default"!==u&&function(e){n.d(t,e,(function(){return i[e]}))}(u);n("5e2f");var r,o=n("f0c5"),c=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,"57e6ce8e",null,!1,a["a"],r);t["default"]=c.exports},5293:function(e,t,n){},"5e2f":function(e,t,n){"use strict";var a=n("5293"),i=n.n(a);i.a},9937:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{timeout:!1}},components:{},props:{data:{type:Object}},watch:{data:{handler:function(e){e.bargain_end_time&&(new Date).getTime()<Number(1e3*e.bargain_end_time)&&this.setData({timeout:!0})},immediate:!0,deep:!0}},methods:{toBuy:function(e){this.$emit("showLayer",{detail:{isBuy:e.currentTarget.dataset.flag,flag:!0}})},goIndex:function(){wx.navigateTo({url:"/pages/index/index/index"})}}};t.default=a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'bargaining/pages/goodItem/footer/footer-create-component',
    {
        'bargaining/pages/goodItem/footer/footer-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4e88"))
        })
    },
    [['bargaining/pages/goodItem/footer/footer-create-component']]
]);
