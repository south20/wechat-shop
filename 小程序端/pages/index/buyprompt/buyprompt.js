(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/buyprompt/buyprompt"],{"1e15":function(t,a,n){"use strict";n.r(a);var e=n("cb5a"),o=n.n(e);for(var i in e)"default"!==i&&function(t){n.d(a,t,(function(){return e[t]}))}(i);a["default"]=o.a},"4bac":function(t,a,n){"use strict";n.r(a);var e=n("74ad"),o=n("1e15");for(var i in o)"default"!==i&&function(t){n.d(a,t,(function(){return o[t]}))}(i);n("5a90");var c,r=n("f0c5"),u=Object(r["a"])(o["default"],e["b"],e["c"],!1,null,"4326cf82",null,!1,e["a"],c);a["default"]=u.exports},"5a90":function(t,a,n){"use strict";var e=n("8c77"),o=n.n(e);o.a},"74ad":function(t,a,n){"use strict";var e,o=function(){var t=this,a=t.$createElement;t._self._c},i=[];n.d(a,"b",(function(){return o})),n.d(a,"c",(function(){return i})),n.d(a,"a",(function(){return e}))},"8c77":function(t,a,n){},cb5a:function(t,a,n){"use strict";(function(t){var n;Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={data:function(){return{name:"",avatar:"",data:[],showFlag:!1,animation:"",is_open:!1}},components:{},props:{leave:{type:Boolean}},watch:{leave:{handler:function(t){console.log(t),t&&(console.log(t),clearInterval(n))}}},beforeMount:function(){t.getStorageSync("Config").pay_info&&this.init()},methods:{getData:function(){var t=this;this.http({url:"shopRandomOrder",noLogin:!0}).then((function(a){t.setData({data:a.data})}))},init:function(){var t,a=this;n=setInterval((function(){1!=a.data.length&&0!=a.data.length||a.getData(),t=a.data.splice(0,1)[0];try{a.setData({name:t.nickname,avatar:t.avatar,animation:"animation"}),setTimeout((function(){a.setData({animation:""})}),3e3)}catch(n){}}),6e3)}}};a.default=e}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/index/buyprompt/buyprompt-create-component',
    {
        'pages/index/buyprompt/buyprompt-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4bac"))
        })
    },
    [['pages/index/buyprompt/buyprompt-create-component']]
]);
