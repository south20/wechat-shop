(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/model/model"],{"3b18":function(t,n,e){"use strict";e.r(n);var o=e("7887"),a=e.n(o);for(var r in o)"default"!==r&&function(t){e.d(n,t,(function(){return o[t]}))}(r);n["default"]=a.a},"6dee":function(t,n,e){},7887:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{background:t.getStorageSync("background"),fontcolor:t.getStorageSync("nabigationFontColor")}},components:{},props:{title:{type:String,default:"标题"},show:{type:Boolean,default:!0},data:{type:Array,abserver:function(t){console.log("data",t)}}},beforeMount:function(){console.log("我出来了!!!!")},methods:{canel:function(t){this.$emit("error",{detail:""})},ok:function(t){this.$emit("ok",{detail:""})}}};n.default=e}).call(this,e("543d")["default"])},"8ab1":function(t,n,e){"use strict";var o,a=function(){var t=this,n=t.$createElement;t._self._c},r=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return o}))},9530:function(t,n,e){"use strict";e.r(n);var o=e("8ab1"),a=e("3b18");for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);e("b18c");var u,c=e("f0c5"),i=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,"6cac0367",null,!1,o["a"],u);n["default"]=i.exports},b18c:function(t,n,e){"use strict";var o=e("6dee"),a=e.n(o);a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/model/model-create-component',
    {
        'pages/model/model-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9530"))
        })
    },
    [['pages/model/model-create-component']]
]);
