(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["superuser/Customer/Customer"],{"045f":function(t,e,n){"use strict";(function(t){n("cd90");a(n("66fd"));var e=a(n("8ed8"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"06f6":function(t,e,n){"use strict";var a=n("f3e8"),r=n.n(a);r.a},2140:function(t,e,n){"use strict";var a,r=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}))},"29cd":function(t,e,n){"use strict";n.r(e);var a=n("5c86"),r=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=r.a},"5c86":function(t,e,n){"use strict";function a(t){return i(t)||u(t)||o(t)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(t,e){if(t){if("string"===typeof t)return s(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(t,e):void 0}}function u(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function i(t){if(Array.isArray(t))return s(t)}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var c=function(){n.e("superuser/mylist/mylist").then(function(){return resolve(n("bfa0"))}.bind(null,n)).catch(n.oe)},f={data:function(){return{index:1,search:"",data:[],status:0,page:1}},components:{List:c},props:{},onLoad:function(t){this.options=t,this.setTheme(),this.getData()},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){this.getData()},onShareAppMessage:function(){},methods:{getData:function(t){var e=this,n={type:"2",status:this.status,page:this.page};t&&t.hasOwnProperty("detail")&&(n.searchName=t.detail.value,this.setData({data:[]})),this.http({url:"distributionUser",data:n}).then((function(t){var n=[].concat(a(e.data),a(t.data));e.setData({data:n,page:e.page+1})}))},changeList:function(t){console.log(t),this.setData({index:t.currentTarget.dataset.status,status:1==t.currentTarget.dataset.status?0:1,data:[],page:1}),this.getData()}}};e.default=f},"8ed8":function(t,e,n){"use strict";n.r(e);var a=n("2140"),r=n("29cd");for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n("06f6");var u,i=n("f0c5"),s=Object(i["a"])(r["default"],a["b"],a["c"],!1,null,"b63ce432",null,!1,a["a"],u);e["default"]=s.exports},f3e8:function(t,e,n){}},[["045f","common/runtime","common/vendor"]]]);