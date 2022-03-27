(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/integralMall/index/classify/classify"],{5600:function(t,n,a){"use strict";var e,o=function(){var t=this,n=t.$createElement;t._self._c},c=[];a.d(n,"b",(function(){return o})),a.d(n,"c",(function(){return c})),a.d(n,"a",(function(){return e}))},"7f1b":function(t,n,a){},"8a85":function(t,n,a){"use strict";a.r(n);var e=a("5600"),o=a("9baa");for(var c in o)"default"!==c&&function(t){a.d(n,t,(function(){return o[t]}))}(c);a("ca7f");var r,u=a("f0c5"),i=Object(u["a"])(o["default"],e["b"],e["c"],!1,null,"4d2af1e0",null,!1,e["a"],r);n["default"]=i.exports},"8dec":function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{list:[]}},components:{},props:{},beforeMount:function(){this.getList()},methods:{getList:function(){var t=this;this.http({url:"shopScoreCategoryAll"}).then((function(n){t.setData({list:n.data})}))},go:function(t){console.log(t),wx.navigateTo({url:"../../goodsClassify/goodsClassify/goodsClassify?id=".concat(t.currentTarget.dataset.id,"&name=").concat(t.currentTarget.dataset.name)})}}};n.default=e},"9baa":function(t,n,a){"use strict";a.r(n);var e=a("8dec"),o=a.n(e);for(var c in e)"default"!==c&&function(t){a.d(n,t,(function(){return e[t]}))}(c);n["default"]=o.a},ca7f:function(t,n,a){"use strict";var e=a("7f1b"),o=a.n(e);o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/integralMall/index/classify/classify-create-component',
    {
        'pages/integralMall/index/classify/classify-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8a85"))
        })
    },
    [['pages/integralMall/index/classify/classify-create-component']]
]);
