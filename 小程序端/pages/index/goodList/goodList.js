(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/goodList/goodList"],{"2b80":function(t,a,e){"use strict";e.r(a);var n=e("4da5"),o=e("d7a0");for(var i in o)"default"!==i&&function(t){e.d(a,t,(function(){return o[t]}))}(i);e("4f33");var s,c=e("f0c5"),r=Object(c["a"])(o["default"],n["b"],n["c"],!1,null,"200e358e",null,!1,n["a"],s);a["default"]=r.exports},"39e9":function(t,a,e){},"4da5":function(t,a,e){"use strict";var n,o=function(){var t=this,a=t.$createElement;t._self._c},i=[];e.d(a,"b",(function(){return o})),e.d(a,"c",(function(){return i})),e.d(a,"a",(function(){return n}))},"4f33":function(t,a,e){"use strict";var n=e("39e9"),o=e.n(n);o.a},c15c:function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;getApp();var e,n={data:function(){return{gooddata:[],buyPeople:[],index:0,name:"",avatar:"",animation:"",first_time:"",last_time:""}},components:{},props:{data:{type:Object,default:function(){return{}}},leave:{type:Boolean}},watch:{data:{handler:function(t){t&&(1==t.details.style?this.getGroup():2==t.details.style?this.getSeckill():3==t.details.style&&this.getNewPeople())},immediate:!0,deep:!0},leave:{handler:function(t){t&&clearInterval(e)}}},methods:{getSeckill:function(t){var a=this;this.http({url:"shopFlashSale"}).then((function(t){try{a.setData({first_time:t.data[0].start_time2,last_time:t.data[1].start_time2})}catch(e){a.setData({first_time:t.data[0].start_time2})}a.getSeckillData(t.data[0].id)})).catch((function(t){a.setData({gooddata:[]})}))},getSeckillData:function(t){var a=this;console.log(typeof t),this.http({url:"shopFlashSale/".concat("string"==typeof t?t:t.currentTarget.dataset.id)}).then((function(t){console.log(t);try{a.setData({gooddata:t.data.goods})}catch(e){a.setData({gooddata:t.data.goods,first_time:fa.data[0].start_time2})}}))},getGroup:function(a){var e=this;this.http({url:"shopGoods",data:{is_open_assemble:1,key:t.getStorageSync("shopkey")}}).then((function(t){e.setData({gooddata:t.data}),e.getBuy()})).catch((function(t){e.getBuy()}))},getNewPeople:function(a){var e=this;this.http({url:"shopGoods",data:{is_recruits:1,key:t.getStorageSync("shopkey")}}).then((function(t){e.setData({gooddata:t.data})})).catch((function(t){e.setData({gooddata:[]})}))},getBuy:function(){var t=this;this.http({url:"shopRandomOrder",noLogin:!0}).then((function(a){clearInterval(e),t.setData({buyPeople:a.data,name:a.data[a.data.length-1].nickname,avatar:a.data[a.data.length-1].avatar,animation:"animation"}),setTimeout((function(){t.setData({animation:""})}),500),t.init()}))},init:function(){var t,a=this;e=setInterval((function(){1!=a.buyPeople.length&&0!=a.buyPeople.length||a.getBuy(),t=a.buyPeople.splice(0,1)[0];try{a.setData({name:t.nickname,avatar:t.avatar,animation:"animation"}),setTimeout((function(){a.setData({animation:""})}),500)}catch(e){}}),5e3)},go:function(t){wx.navigateTo({url:t.currentTarget.dataset.url})}}};a.default=n}).call(this,e("543d")["default"])},d7a0:function(t,a,e){"use strict";e.r(a);var n=e("c15c"),o=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,(function(){return n[t]}))}(i);a["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/index/goodList/goodList-create-component',
    {
        'pages/index/goodList/goodList-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("2b80"))
        })
    },
    [['pages/index/goodList/goodList-create-component']]
]);
