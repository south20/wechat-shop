(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/integralMall/index/banner/banner"],{2558:function(t,n,e){"use strict";var a,r=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return a}))},"4d64":function(t,n,e){"use strict";e.r(n);var a=e("900b"),r=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=r.a},"5fa5":function(t,n,e){"use strict";e.r(n);var a=e("2558"),r=e("4d64");for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);e("c70f");var o,c=e("f0c5"),i=Object(c["a"])(r["default"],a["b"],a["c"],!1,null,"836660aa",null,!1,a["a"],o);n["default"]=i.exports},"900b":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{data:[{pic_url:""}]}},components:{},props:{},beforeMount:function(){this.getBanner()},methods:{getBanner:function(t){var n=this;this.http({url:"shopScoreBanner"}).then((function(t){n.setData({data:t.data})}))},go:function(t){console.log(t.currentTarget.dataset),wx.navigateTo({url:"../../goodsItem/goodsItem?id=".concat(t.currentTarget.dataset.link)})}}};n.default=a},b6ac:function(t,n,e){},c70f:function(t,n,e){"use strict";var a=e("b6ac"),r=e.n(a);r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/integralMall/index/banner/banner-create-component',
    {
        'pages/integralMall/index/banner/banner-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5fa5"))
        })
    },
    [['pages/integralMall/index/banner/banner-create-component']]
]);
