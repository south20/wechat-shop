(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/spellGroup/willGroup/willGroup"],{1231:function(t,e,o){"use strict";o.r(e);var r=o("a264"),n=o.n(r);for(var a in r)"default"!==a&&function(t){o.d(e,t,(function(){return r[t]}))}(a);e["default"]=n.a},"7eb4":function(t,e,o){"use strict";o.r(e);var r=o("8913"),n=o("1231");for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);o("bfff");var i,c=o("f0c5"),s=Object(c["a"])(n["default"],r["b"],r["c"],!1,null,"385842c7",null,!1,r["a"],i);e["default"]=s.exports},8913:function(t,e,o){"use strict";var r,n=function(){var t=this,e=t.$createElement;t._self._c},a=[];o.d(e,"b",(function(){return n})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return r}))},a264:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r,n=o("1be5"),a={data:function(){return{goods_info:{},avatar:[],poor:0,background:"",expire_time:"",group_id:"",order_sn:""}},components:{},props:{},onLoad:function(t){this.options=t},onReady:function(){},onHide:function(){clearInterval(r)},onUnload:function(){clearInterval(r)},onShow:function(){this.getData(this.options.id,this.options.order_sn),this.setTheme(),wx.setNavigationBarTitle({title:"等待成团"}),this.setData({background:t.getStorageSync("background"),order_sn:this.options.order_sn,group_id:this.options.id})},onReachBottom:function(){},onShareAppMessage:function(){return{title:"您的好友".concat(t.getStorageSync("user").nickname,"邀请您参与拼团"),path:"/pages/spellGroup/goGroup/goGroup?group_id=".concat(this.group_id,"&order_sn=").concat(this.order_sn,"&leader_id=").concat(t.getStorageSync("area").uid,"&user_id=").concat(t.getStorageSync("user").id,"&leader_id=").concat(t.getStorageSync("area_id"))}},methods:{getData:function(t,e){var o=this;this.http({url:"groupList/".concat(t),data:{type:1,order_sn:e}}).then((function(t){if(console.log(t),o.setData({goods_info:t.data.goods_info,avatar:t.data.list,poor:parseInt(t.data.poor),expire_time:(0,n.timeStamp)(1e3*t.data.list[0].expire_time,"hh:ss:mm")}),0!=t.data.poor){if(1e3*t.data.list[0].expire_time<(new Date).getTime())return clearInterval(r),wx.redirectTo({url:"/pages/spellGroup/errGroup/errGroup?id=".concat(o.group_id,"&order_sn=").concat(o.order_sn)}),!1;r=setInterval((function(){if(1e3*t.data.list[0].expire_time<(new Date).getTime())return clearInterval(r),wx.redirectTo({url:"/pages/spellGroup/errGroup/errGroup?id=".concat(o.group_id,"&order_sn=").concat(o.order_sn)}),!1;o.setData({expire_time:(0,n.timeStamp)(1e3*t.data.list[0].expire_time,"hh:ss:mm")}),console.log((0,n.timeStamp)(1e3*t.data.list[0].expire_time,"hh:ss:mm"))}),1e3)}else wx.redirectTo({url:"/pages/spellGroup/okGroup/okGroup?id=".concat(o.group_id,"&order_sn=").concat(o.order_sn)})}))}}};e.default=a}).call(this,o("543d")["default"])},a4ac:function(t,e,o){},bfff:function(t,e,o){"use strict";var r=o("a4ac"),n=o.n(r);n.a},ffb5:function(t,e,o){"use strict";(function(t){o("cd90");r(o("66fd"));var e=r(o("7eb4"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])}},[["ffb5","common/runtime","common/vendor"]]]);