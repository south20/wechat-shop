(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/returnOrder/returnOrder/returnOrder"],{"172b":function(t,e,n){"use strict";var r=n("1ce3"),a=n.n(r);a.a},"1ce3":function(t,e,n){},7096:function(t,e,n){"use strict";var r,a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}))},"9dc9":function(t,e,n){"use strict";(function(t){n("cd90");r(n("66fd"));var e=r(n("a59b"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},a59b:function(t,e,n){"use strict";n.r(e);var r=n("7096"),a=n("b1ef");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("172b");var i,u=n("f0c5"),s=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,"81f486ce",null,!1,r["a"],i);e["default"]=s.exports},b1ef:function(t,e,n){"use strict";n.r(e);var r=n("dd18"),a=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=a.a},dd18:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=function(){n.e("pages/returnOrder/goods/goods").then(function(){return resolve(n("34c7"))}.bind(null,n)).catch(n.oe)},a=function(){n.e("pages/returnOrder/returnOrderHeader/returnOrderHeader").then(function(){return resolve(n("56c7"))}.bind(null,n)).catch(n.oe)},o=function(){n.e("pages/footer/footer").then(function(){return resolve(n("2175"))}.bind(null,n)).catch(n.oe)},i={data:function(){return{List:[],id:0,modalFlag:!1,order_sn:"",value:"",ids:0,page:!1}},components:{goods:r,returnOrderHeader:a,diyfooter:o},props:{},onShow:function(){this.getData(this.id),wx.setNavigationBarTitle({title:"售后订单"})},methods:{getData:function(t){var e=this;wx.showLoading({title:"Loading"}),this.http({url:"shopOrderAfterList",data:{status:t}}).then((function(t){e.List=t.data})).catch((function(t){e.List=[]}))},getMoreData:function(){},change:function(t){var e=t.detail.id;this.setData({id:e}),this.getData(e)},fullOrder:function(t){var e=t.currentTarget.dataset.order_sn;this.setData({order_sn:e,ids:t.currentTarget.dataset.id,modalFlag:!0})},write:function(t){var e=t.detail.value;this.setData({value:e})},canel:function(){this.setData({modalFlag:!1})},ok:function(){var e=this;if(0==this.value.trim().length)return wx.showToast({title:"请填写快递单号",icon:"none"}),!1;var n={after_express_number:this.value,order_sn:this.order_sn,type:2,id:this.ids};wx.request({url:"".concat(t.getStorageSync("url"),"shopOrderAfter"),data:n,method:"put",header:{"content-type":"application/x-www-form-urlencoded","Access-Token":t.getStorageSync("jwt")},success:function(t){200==t.data.status?(wx.showToast({title:"提交成功",icon:"none"}),e.setData({modalFlag:!1}),e.getData(e.id)):(wx.showToast({title:t.data.message,icon:"none"}),e.setData({modalFlag:!1}))}})},footerFlag:function(t){this.setData({page:!0})}}};e.default=i}).call(this,n("543d")["default"])}},[["9dc9","common/runtime","common/vendor"]]]);