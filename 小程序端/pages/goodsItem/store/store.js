(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goodsItem/store/store"],{"3da5":function(e,t,n){},4825:function(e,t,n){"use strict";var a,i=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}))},"51b8":function(e,t,n){"use strict";n.r(t);var a=n("4825"),i=n("b41d");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("64b2");var o,u=n("f0c5"),d=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,"57b6c0fe",null,!1,a["a"],o);t["default"]=d.exports},"64b2":function(e,t,n){"use strict";var a=n("3da5"),i=n.n(a);i.a},b41d:function(e,t,n){"use strict";n.r(t);var a=n("ea2a"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=i.a},ea2a:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{name:"",pic_url:"",detail_info:"",is_open:!1}},components:{},props:{label:{type:Array},supplier_id:{type:String},data:{type:Object}},watch:{label:{handler:function(e){},immediate:!0,deep:!0},supplier_id:{handler:function(e){},immediate:!0},data:{handler:function(e){console.log(e.supplier_id),0==e.supplier_id?this.getInfo():this.getLeaderInfo(e.supplier_id)},immediate:!0,deep:!0}},beforeMount:function(){this.setData({is_open:e.getStorageSync("Config").is_merchant_info})},methods:{getInfo:function(){var t=this;this.http({url:"ShopAppInfo",data:{key:e.getStorageSync("shopkey")}}).then((function(e){t.setData({name:e.data.name,pic_url:e.data.pic_url,detail_info:e.data.detail_info})}))},getLeaderInfo:function(e){var t=this;this.http({url:"shopSuppliers/".concat(e)}).then((function(e){t.setData({name:e.data.leader.realname,pic_url:e.data.leader.logo,detail_info:e.data.intro})}))},goIndex:function(){0==this.supplier_id?wx.redirectTo({url:"/pages/index/index/index"}):wx.redirectTo({url:"/supplier/index/index?id=".concat(this.supplier_id)})}}};t.default=n}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/goodsItem/store/store-create-component',
    {
        'pages/goodsItem/store/store-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("51b8"))
        })
    },
    [['pages/goodsItem/store/store-create-component']]
]);
