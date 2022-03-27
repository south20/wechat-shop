(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/memberCard/memberCardInfo/memberCardInfo"],{"272f":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{list:[],flag:0}},components:{},props:{},beforeMount:function(){this.getData()},methods:{getData:function(){var t=this;this.http({url:"vipList"}).then((function(e){console.log(e),t.setData({list:e.data}),t.$emit("props",{detail:{data:e.data[0]}})}))},choose:function(t){t.currentTarget.dataset.index!=this.flag&&(this.setData({flag:t.currentTarget.dataset.index}),this.$emit("props",{detail:{data:this.data.list[this.data.flag]}}))}}};e.default=n},2916:function(t,e,a){},"9d7c":function(t,e,a){"use strict";var n=a("2916"),r=a.n(n);r.a},c6f1:function(t,e,a){"use strict";a.r(e);var n=a("f9e7"),r=a("d6c8");for(var i in r)"default"!==i&&function(t){a.d(e,t,(function(){return r[t]}))}(i);a("9d7c");var u,o=a("f0c5"),c=Object(o["a"])(r["default"],n["b"],n["c"],!1,null,"7b77eb5e",null,!1,n["a"],u);e["default"]=c.exports},d6c8:function(t,e,a){"use strict";a.r(e);var n=a("272f"),r=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=r.a},f9e7:function(t,e,a){"use strict";var n,r=function(){var t=this,e=t.$createElement;t._self._c},i=[];a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return n}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/home/memberCard/memberCardInfo/memberCardInfo-create-component',
    {
        'pages/home/memberCard/memberCardInfo/memberCardInfo-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c6f1"))
        })
    },
    [['pages/home/memberCard/memberCardInfo/memberCardInfo-create-component']]
]);
