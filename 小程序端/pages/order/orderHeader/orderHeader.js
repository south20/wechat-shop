(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/orderHeader/orderHeader"],{"4fdc":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{menu:[{name:"全部",id:8},{name:"待付款",id:0},{name:"待发货",id:1},{name:"待收货",id:3},{name:"待评价",id:6}],flag:0}},components:{},props:{headIndex:{type:String,default:"0"}},watch:{headIndex:{handler:function(e){this.setData({flag:e})},immediate:!0}},methods:{changemenu:function(e){var t=e.currentTarget.dataset.id,n=e.currentTarget.dataset.index;this.setData({flag:n}),this.$emit("postId",{detail:{id:t}})}}};t.default=a},5191:function(e,t,n){"use strict";var a,r=function(){var e=this,t=e.$createElement;e._self._c},d=[];n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return d})),n.d(t,"a",(function(){return a}))},a3e8:function(e,t,n){"use strict";var a=n("de9c"),r=n.n(a);r.a},d0c3:function(e,t,n){"use strict";n.r(t);var a=n("5191"),r=n("f532");for(var d in r)"default"!==d&&function(e){n.d(t,e,(function(){return r[e]}))}(d);n("a3e8");var u,i=n("f0c5"),c=Object(i["a"])(r["default"],a["b"],a["c"],!1,null,"48445bd5",null,!1,a["a"],u);t["default"]=c.exports},de9c:function(e,t,n){},f532:function(e,t,n){"use strict";n.r(t);var a=n("4fdc"),r=n.n(a);for(var d in a)"default"!==d&&function(e){n.d(t,e,(function(){return a[e]}))}(d);t["default"]=r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/order/orderHeader/orderHeader-create-component',
    {
        'pages/order/orderHeader/orderHeader-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("d0c3"))
        })
    },
    [['pages/order/orderHeader/orderHeader-create-component']]
]);
