(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["group/groupmenbersorder/groupmenbersorder/groupmenbersorder"],{"0bfe":function(t,e,a){"use strict";a.r(e);var r=a("bc78"),n=a("57c6");for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("3a04");var i,s=a("f0c5"),u=Object(s["a"])(n["default"],r["b"],r["c"],!1,null,"ee98af16",null,!1,r["a"],i);e["default"]=u.exports},"3a04":function(t,e,a){"use strict";var r=a("7153"),n=a.n(r);n.a},"57c6":function(t,e,a){"use strict";a.r(e);var r=a("67e4"),n=a.n(r);for(var o in r)"default"!==o&&function(t){a.d(e,t,(function(){return r[t]}))}(o);e["default"]=n.a},"67e4":function(t,e,a){"use strict";(function(t){function r(t){return i(t)||o(t)||u(t)||n()}function n(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function i(t){if(Array.isArray(t))return c(t)}function s(t){if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=u(t))){var e=0,a=function(){};return{s:a,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,n,o=!0,i=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return o=t.done,t},e:function(t){i=!0,n=t},f:function(){try{o||null==r.return||r.return()}finally{if(i)throw n}}}}function u(t,e){if(t){if("string"===typeof t)return c(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?c(t,e):void 0}}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,r=new Array(e);a<e;a++)r[a]=t[a];return r}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;getApp();var d=function(){a.e("group/groupmenbersorder/GroupMenbersOrderHeader/GroupMenbersOrderHeader").then(function(){return resolve(a("1615"))}.bind(null,a)).catch(a.oe)},l=function(){a.e("group/groupmenbersorder/GroupOrderList/GroupOrderList").then(function(){return resolve(a("7eb5"))}.bind(null,a)).catch(a.oe)},f={data:function(){return{title:"团员订单",status:1,data:[],page:1,flag:!0,text:"",type:1}},components:{GroupMenbersOrderHeader:d,GroupOrderList:l},props:{},onLoad:function(t){this.options=t,wx.setNavigationBarColor({backgroundColor:"#373D4B",frontColor:"#ffffff"}),wx.setNavigationBarTitle({title:this.title}),t.uid?(this.setData({status:1}),this.search(t.uid)):(this.setData({status:t.id||1}),this.getList(this.status))},onReachBottom:function(){console.log("is here"),this.getmoreData()},methods:{getList:function(){var e=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=a.hasOwnProperty("detail")?a.detail.id:a;this.setData({status:r,flag:!0,page:1,text:""}),this.http({url:"tuanOrder/".concat(t.getStorageSync("user").id||0),data:{order_status:r,page:this.page,text:this.text,type:this.type}}).then((function(t){var a,r=s(t.data);try{for(r.s();!(a=r.n()).done;){var n=a.value;n.address=n.address.slice(0,n.address.length-7)}}catch(o){r.e(o)}finally{r.f()}e.setData({data:t.data,page:e.page+1})})).catch((function(t){e.setData({data:[]})}))},getmoreData:function(){var e=this;this.flag&&this.http({url:"tuanOrder/".concat(t.getStorageSync("user").id),data:{order_status:this.status,page:this.page,text:this.text,type:this.type}}).then((function(t){var a,n=s(t.data);try{for(n.s();!(a=n.n()).done;){var o=a.value;o.address=o.address.slice(0,o.address.length-7)}}catch(u){n.e(u)}finally{n.f()}var i=e.data;console.log(i),i.push.apply(i,r(t.data)),console.log(i),e.setData({data:i,page:e.page++}),console.log(e.data)})).catch((function(t){e.setData({flag:!1})}))},deleteData:function(t){console.log(t.detail);var e=this.data;e.splice(t.detail.index,1),this.setData({data:e})},search:function(e){var a=this,r=e.detail?e.detail.text:e;this.setData({flag:!0,page:1,text:r}),this.http({url:"tuanOrder/".concat(t.getStorageSync("user").id||0),data:{order_status:this.status,page:this.page,text:r,type:this.type}}).then((function(t){var e,r=s(t.data);try{for(r.s();!(e=r.n()).done;){var n=e.value;n.address=n.address.slice(0,n.address.length-7)}}catch(o){r.e(o)}finally{r.f()}a.setData({data:t.data,page:a.page+1})})).catch((function(t){a.setData({data:[]})}))},showTime:function(t){var e=this;console.log(t.detail),wx.showModal({cancelColor:"cancelColor",content:"是否一键签收从".concat(t.detail.value,"发货的订单"),success:function(a){a.confirm&&e.http({url:"shopTuanReceipt",method:"put",data:{time:t.detail.value}}).then((function(t){wx.showToast({title:"一键收货成功"}),e.getList()}))}})}}};e.default=f}).call(this,a("543d")["default"])},"6afa":function(t,e,a){"use strict";(function(t){a("cd90");r(a("66fd"));var e=r(a("0bfe"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},7153:function(t,e,a){},bc78:function(t,e,a){"use strict";var r,n=function(){var t=this,e=t.$createElement;t._self._c},o=[];a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return r}))}},[["6afa","common/runtime","common/vendor"]]]);