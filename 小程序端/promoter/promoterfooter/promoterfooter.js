(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["promoter/promoterfooter/promoterfooter"],{"016f":function(t,e,o){"use strict";o.r(e);var n=o("5ce7"),r=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=r.a},"042d":function(t,e,o){"use strict";var n=o("c362"),r=o.n(n);r.a},"5ce7":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{menu:[{name:"店铺首页",url:"/pages/index/index/index",picurl:"/static/images/group/groupfooter/ft1.png",selectpicurl:"/static/images/group/groupfooter/ft1-on.png"},{name:"".concat(t.getStorageSync("leader_name"),"中心"),url:"/group/groupcenter/groupcenter/groupcenter",picurl:"/static/images/group/groupfooter/ft4.png",selectpicurl:"/static/images/group/groupfooter/ft4-on.png"}],text_selection:t.getStorageSync("text_selection"),background:t.getStorageSync("background"),fontColor:t.getStorageSync("nabigationFontColor")}},components:{},props:{name:{type:String}},watch:{name:{handler:function(t){console.log(t)},immediate:!0}},beforeMount:function(){wx.setNavigationBarColor({frontColor:this.fontColor,backgroundColor:this.background}),wx.setNavigationBarTitle({title:this.name})},methods:{go:function(t){wx.redirectTo({url:t.currentTarget.dataset.url})}}};e.default=o}).call(this,o("543d")["default"])},"76a8":function(t,e,o){"use strict";var n,r=function(){var t=this,e=t.$createElement;t._self._c},a=[];o.d(e,"b",(function(){return r})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return n}))},c362:function(t,e,o){},d3be:function(t,e,o){"use strict";o.r(e);var n=o("76a8"),r=o("016f");for(var a in r)"default"!==a&&function(t){o.d(e,t,(function(){return r[t]}))}(a);o("042d");var u,c=o("f0c5"),i=Object(c["a"])(r["default"],n["b"],n["c"],!1,null,"929717b8",null,!1,n["a"],u);e["default"]=i.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'promoter/promoterfooter/promoterfooter-create-component',
    {
        'promoter/promoterfooter/promoterfooter-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("d3be"))
        })
    },
    [['promoter/promoterfooter/promoterfooter-create-component']]
]);
