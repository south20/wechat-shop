(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goodsItem/goodsComment/goodsComment"],{"2e97":function(t,e,n){"use strict";n.r(e);var a=n("6671"),o=n("7c04");for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);n("d22b");var u,i=n("f0c5"),r=Object(i["a"])(o["default"],a["b"],a["c"],!1,null,"5e637aaf",null,!1,a["a"],u);e["default"]=r.exports},6671:function(t,e,n){"use strict";var a,o=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return a}))},"6e7c":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;getApp();var n={data:function(){return{data:[]}},components:{},props:{goodsId:{type:Number}},watch:{goodsId:{handler:function(t){""!=t&&this.getData(t)},immediate:!0}},methods:{getData:function(e){var n=this;this.http({url:"shopGoodsComments/".concat(e),data:{key:t.getStorageSync("shopkey")}}).then((function(t){n.setData({data:t.data})}))},go:function(){wx.navigateTo({url:"/pages/goodsItem/commentsDetail/commentsDetail?id=".concat(this.goodsId)})}}};e.default=n}).call(this,n("543d")["default"])},"7c04":function(t,e,n){"use strict";n.r(e);var a=n("6e7c"),o=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);e["default"]=o.a},"8e7a":function(t,e,n){},d22b:function(t,e,n){"use strict";var a=n("8e7a"),o=n.n(a);o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/goodsItem/goodsComment/goodsComment-create-component',
    {
        'pages/goodsItem/goodsComment/goodsComment-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("2e97"))
        })
    },
    [['pages/goodsItem/goodsComment/goodsComment-create-component']]
]);
