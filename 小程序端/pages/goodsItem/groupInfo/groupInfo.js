(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goodsItem/groupInfo/groupInfo"],{"0890":function(t,n,a){"use strict";a.r(n);var e=a("a34e"),u=a.n(e);for(var o in e)"default"!==o&&function(t){a.d(n,t,(function(){return e[t]}))}(o);n["default"]=u.a},"53a1":function(t,n,a){},"5d6b":function(t,n,a){"use strict";var e=a("53a1"),u=a.n(e);u.a},"8ade":function(t,n,a){"use strict";a.r(n);var e=a("d136"),u=a("0890");for(var o in u)"default"!==o&&function(t){a.d(n,t,(function(){return u[t]}))}(o);a("5d6b");var r,i=a("f0c5"),c=Object(i["a"])(u["default"],e["b"],e["c"],!1,null,"9606a99e",null,!1,e["a"],r);n["default"]=c.exports},a34e:function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{area:{},area_id:0,groupFlag:!1}},components:{},props:{},beforeMount:function(){this.setData({area:t.getStorageSync("area"),area_id:t.getStorageSync("area").uid}),this.getQuanXian()},methods:{getQuanXian:function(){var t=this;this.merchantPlugin().then((function(n){console.log(n),t.setData({groupFlag:n.group_buying})}))},navto:function(){wx.openLocation({latitude:Number(this.area.latitude),longitude:Number(this.area.longitude)})}}};n.default=a}).call(this,a("543d")["default"])},d136:function(t,n,a){"use strict";var e,u=function(){var t=this,n=t.$createElement;t._self._c},o=[];a.d(n,"b",(function(){return u})),a.d(n,"c",(function(){return o})),a.d(n,"a",(function(){return e}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/goodsItem/groupInfo/groupInfo-create-component',
    {
        'pages/goodsItem/groupInfo/groupInfo-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8ade"))
        })
    },
    [['pages/goodsItem/groupInfo/groupInfo-create-component']]
]);
