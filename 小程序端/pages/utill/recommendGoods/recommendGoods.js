(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/utill/recommendGoods/recommendGoods"],{"5af8":function(t,e,n){"use strict";var o=n("eabb"),a=n.n(o);a.a},"6ef7":function(t,e,n){"use strict";n.r(e);var o=n("9d17"),a=n("fbee");for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);n("5af8");var c,r=n("f0c5"),d=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,"7afe0884",null,!1,o["a"],c);e["default"]=d.exports},"9d17":function(t,e,n){"use strict";var o,a=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return o}))},e2e0:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{goods_list:[]}},components:{},props:{type:{type:String}},watch:{type:{handler:function(t){0!=t.length&&this.getRecommendGoods(t)},immediate:!0}},methods:{getRecommendGoods:function(e){var n=this;this.http({url:"shopRecommendGoods",data:{key:t.getStorageSync("shopkey")}}).then((function(t){1==t.data[e]&&n.setData({goods_list:t.data.goods_list})}))},go:function(t){wx.navigateTo({url:"/pages/goodsItem/goodsItem/goodsItem?id=".concat(t.currentTarget.dataset.id)})}}};e.default=n}).call(this,n("543d")["default"])},eabb:function(t,e,n){},fbee:function(t,e,n){"use strict";n.r(e);var o=n("e2e0"),a=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);e["default"]=a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/utill/recommendGoods/recommendGoods-create-component',
    {
        'pages/utill/recommendGoods/recommendGoods-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6ef7"))
        })
    },
    [['pages/utill/recommendGoods/recommendGoods-create-component']]
]);
