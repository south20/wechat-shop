(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goodsClassify/data/data"],{"0f59":function(t,a,e){"use strict";var n,r=function(){var t=this,a=t.$createElement;t._self._c},i=[];e.d(a,"b",(function(){return r})),e.d(a,"c",(function(){return i})),e.d(a,"a",(function(){return n}))},a123:function(t,a,e){"use strict";var n=e("ec7e"),r=e.n(n);r.a},a626:function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;getApp();var e={data:function(){return{active:1,datas:[],cartData:{},layerData:{},layerFlag:!1,background:"",propertyindex:0,nums:0}},components:{},props:{data:{type:Array},classifyData:{type:Array}},watch:{data:{handler:function(t){this.setData({layerData:t[0]})},immediate:!0,deep:!0},classifyData:{handler:function(t){console.log(t),0!=t.length&&this.setData({active:t[0].id})},immediate:!0,deep:!0}},beforeMount:function(){this.getData(),this.setData({background:t.getStorageSync("background")})},methods:{togoodsItem:function(t){var a=t.currentTarget.dataset.id;wx.navigateTo({url:"/pages/goodsItem/goodsItem/goodsItem?id=".concat(a)})},change:function(t){var a=t.currentTarget.dataset.id;this.setData({active:a}),this.$emit("changeData",{detail:{id:a}})},getData:function(){var t=this;this.http({url:"shopCart"}).then((function(a){var e=Object.fromEntries(a.data.map((function(t){return[t.stock_id,t.number]})));t.setData({cartData:e,nums:a.data.map((function(t){return Number(t.number)})).reduce((function(t,a,e){return Number(t)+Number(a)}))})}))},addShopCart:function(t){var a=this;console.log(t.currentTarget.dataset.item);var e=t.currentTarget.dataset.item,n=t.currentTarget.dataset.index;this.http({url:"shopCart",method:"post",data:{goods_id:e.id,stock_id:e.stock[n].id,number:1,supplier_id:e.supplier_id}}).then((function(t){a.$emit("cartUpdata"),a.getData()}))},reduceShopCart:function(t){var a=this,e=t.currentTarget.dataset.item,n=t.currentTarget.dataset.index;this.http({url:"shopCart",method:"post",data:{goods_id:e.id,stock_id:e.stock[n].id,number:-1,supplier_id:e.supplier_id}}).then((function(t){a.$emit("cartUpdata"),a.getData()}))},bindIndex:function(t){console.log(this.data[t.currentTarget.dataset.index]),this.setData({layerData:this.data[t.currentTarget.dataset.index],layerFlag:!0})},changeindex:function(t){this.setData({propertyindex:t.currentTarget.dataset.index})},show:function(){this.setData({layerFlag:!1})}}};a.default=e}).call(this,e("543d")["default"])},dd67:function(t,a,e){"use strict";e.r(a);var n=e("0f59"),r=e("e870");for(var i in r)"default"!==i&&function(t){e.d(a,t,(function(){return r[t]}))}(i);e("a123");var o,d=e("f0c5"),s=Object(d["a"])(r["default"],n["b"],n["c"],!1,null,"11ea34b5",null,!1,n["a"],o);a["default"]=s.exports},e870:function(t,a,e){"use strict";e.r(a);var n=e("a626"),r=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,(function(){return n[t]}))}(i);a["default"]=r.a},ec7e:function(t,a,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/goodsClassify/data/data-create-component',
    {
        'pages/goodsClassify/data/data-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("dd67"))
        })
    },
    [['pages/goodsClassify/data/data-create-component']]
]);
