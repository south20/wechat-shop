(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ec838860"],{"02f4":function(e,t,a){var n=a("4588"),r=a("be13");e.exports=function(e){return function(t,a){var i,s,c=String(r(t)),u=n(a),o=c.length;return u<0||u>=o?e?"":void 0:(i=c.charCodeAt(u),i<55296||i>56319||u+1===o||(s=c.charCodeAt(u+1))<56320||s>57343?e?c.charAt(u):i:e?c.slice(u,u+2):s-56320+(i-55296<<10)+65536)}}},"0390":function(e,t,a){"use strict";var n=a("02f4")(!0);e.exports=function(e,t,a){return t+(a?n(e,t).length:1)}},"0bfb":function(e,t,a){"use strict";var n=a("cb7c");e.exports=function(){var e=n(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},"214f":function(e,t,a){"use strict";a("b0c5");var n=a("2aba"),r=a("32e9"),i=a("79e5"),s=a("be13"),c=a("2b4c"),u=a("520a"),o=c("species"),l=!i((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),d=function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var a="ab".split(e);return 2===a.length&&"a"===a[0]&&"b"===a[1]}();e.exports=function(e,t,a){var p=c(e),v=!i((function(){var t={};return t[p]=function(){return 7},7!=""[e](t)})),m=v?!i((function(){var t=!1,a=/a/;return a.exec=function(){return t=!0,null},"split"===e&&(a.constructor={},a.constructor[o]=function(){return a}),a[p](""),!t})):void 0;if(!v||!m||"replace"===e&&!l||"split"===e&&!d){var f=/./[p],h=a(s,p,""[e],(function(e,t,a,n,r){return t.exec===u?v&&!r?{done:!0,value:f.call(t,a,n)}:{done:!0,value:e.call(a,t,n)}:{done:!1}})),g=h[0],b=h[1];n(String.prototype,e,g),r(RegExp.prototype,p,2==t?function(e,t){return b.call(e,this,t)}:function(e){return b.call(e,this)})}}},4917:function(e,t,a){"use strict";var n=a("cb7c"),r=a("9def"),i=a("0390"),s=a("5f1b");a("214f")("match",1,(function(e,t,a,c){return[function(a){var n=e(this),r=void 0==a?void 0:a[t];return void 0!==r?r.call(a,n):new RegExp(a)[t](String(n))},function(e){var t=c(a,e,this);if(t.done)return t.value;var u=n(e),o=String(this);if(!u.global)return s(u,o);var l=u.unicode;u.lastIndex=0;var d,p=[],v=0;while(null!==(d=s(u,o))){var m=String(d[0]);p[v]=m,""===m&&(u.lastIndex=i(o,r(u.lastIndex),l)),v++}return 0===v?null:p}]}))},"520a":function(e,t,a){"use strict";var n=a("0bfb"),r=RegExp.prototype.exec,i=String.prototype.replace,s=r,c="lastIndex",u=function(){var e=/a/,t=/b*/g;return r.call(e,"a"),r.call(t,"a"),0!==e[c]||0!==t[c]}(),o=void 0!==/()??/.exec("")[1],l=u||o;l&&(s=function(e){var t,a,s,l,d=this;return o&&(a=new RegExp("^"+d.source+"$(?!\\s)",n.call(d))),u&&(t=d[c]),s=r.call(d,e),u&&s&&(d[c]=d.global?s.index+s[0].length:t),o&&s&&s.length>1&&i.call(s[0],a,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(s[l]=void 0)})),s}),e.exports=s},"5f1b":function(e,t,a){"use strict";var n=a("23c6"),r=RegExp.prototype.exec;e.exports=function(e,t){var a=e.exec;if("function"===typeof a){var i=a.call(e,t);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==n(e))throw new TypeError("RegExp#exec called on incompatible receiver");return r.call(e,t)}},8981:function(e,t,a){},9671:function(e,t,a){"use strict";a.d(t,"j",(function(){return r})),a.d(t,"f",(function(){return i})),a.d(t,"o",(function(){return s})),a.d(t,"i",(function(){return c})),a.d(t,"q",(function(){return u})),a.d(t,"g",(function(){return o})),a.d(t,"e",(function(){return l})),a.d(t,"d",(function(){return d})),a.d(t,"h",(function(){return p})),a.d(t,"l",(function(){return v})),a.d(t,"p",(function(){return m})),a.d(t,"a",(function(){return f})),a.d(t,"k",(function(){return h})),a.d(t,"n",(function(){return g})),a.d(t,"r",(function(){return b})),a.d(t,"c",(function(){return x})),a.d(t,"t",(function(){return _})),a.d(t,"s",(function(){return y})),a.d(t,"m",(function(){return w})),a.d(t,"b",(function(){return k}));var n=a("b775");function r(e){return Object(n["a"])({url:"/merchantTuanUser",method:"get",params:e})}function i(e){var t=e.id;return delete e.id,Object(n["a"])({url:"/merchantLeaderGoods/"+t,method:"get",params:e})}function s(e){var t=e.id;return delete e.id,Object(n["a"])({url:"merchantLeaderGoods/"+t,method:"put",data:e})}function c(e){var t=e.id;return delete e.id,Object(n["a"])({url:"/merchantTuanUser/"+t,method:"get",params:e})}function u(e){var t=e.id;return delete e.id,Object(n["a"])({url:"/merchantTuanUsers/"+t,method:"put",data:e})}function o(e){var t=e.id;return delete e.id,Object(n["a"])({url:"/merchantLeagueMember/"+t,method:"get",params:e})}function l(e){return Object(n["a"])({url:"/merchantTuanUser",method:"get",params:e})}function d(e){var t=e.id;return delete e.id,Object(n["a"])({url:"/merchantTuanUser/"+t,method:"put",data:e})}function p(e){return Object(n["a"])({url:"/merchantLeaderLevel",method:"get",params:e})}function v(e){return Object(n["a"])({url:"/merchantLeaderLevel",method:"post",data:e})}function m(e){var t=e.id;return delete e.id,Object(n["a"])({url:"/merchantLeaderLevel/"+t,method:"put",data:e})}function f(e){var t=e.id;return delete e.id,Object(n["a"])({url:"/merchantLeaderLevel/"+t,method:"delete",data:e})}function h(e){return Object(n["a"])({url:"/merchantWarehouse",method:"get",params:e})}function g(e){return Object(n["a"])({url:"/merchantWarehouse",method:"post",data:e})}function b(e){var t=e.id;return delete e.id,Object(n["a"])({url:"/merchantWarehouse/"+t,method:"put",data:e})}function x(e){var t=e.id;return delete e.id,Object(n["a"])({url:"/merchantWarehouse/"+t,method:"delete",data:e})}function _(e){var t=e.id;return delete e.id,Object(n["a"])({url:"/merchantWarehouseHouse/"+t,method:"get",params:e})}function y(e){var t=e.id;return delete e.id,Object(n["a"])({url:"/merchantWarehouseLeader/"+t,method:"get",params:e})}function w(e){return Object(n["a"])({url:"/merchantShopBalance ",method:"post",data:e})}function k(e){var t=e.id;return delete e.id,Object(n["a"])({url:"/merchantTuanUser/"+t,method:"delete",data:e})}},"9e51":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"customers-leave-container"},[e._m(0),e._v(" "),a("el-row",{staticClass:"customers-leave-row"},[a("el-col",{staticClass:"customers-leave-row-col",staticStyle:{"text-align":"left","padding-left":"15px"},attrs:{span:14}},[a("el-button",{staticStyle:{padding:"8px 30px"},attrs:{type:"primary",size:"small"},on:{click:e.add}},[e._v("新 增")])],1),e._v(" "),a("el-col",{staticStyle:{"text-align":"right","padding-right":"40px"},attrs:{span:10}},[a("el-input",{staticStyle:{"max-width":"240px"},attrs:{placeholder:"请输入名称",size:"small"},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}},model:{value:e.searchName,callback:function(t){e.searchName=t},expression:"searchName"}},[a("el-button",{staticClass:"search-button",attrs:{slot:"suffix",type:"text",size:"small"},on:{click:e.search},slot:"suffix"},[a("i",{staticClass:"el-icon-search"})])],1)],1)],1),e._v(" "),a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.leaveList,stripe:""}},[a("el-table-column",{attrs:{prop:"name",label:"等级名称",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"min_exp",label:"销售额",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"reward_ratio",label:"奖励倍数",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"format_create_time",label:"创建时间",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-switch",{attrs:{"active-color":"#13ce66","active-value":"1","inactive-value":"0"},on:{change:function(a){return e.changeStatus(t.row)}},model:{value:t.row.status,callback:function(a){e.$set(t.row,"status",a)},expression:"scope.row.status"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"action-button",attrs:{type:"text"},on:{click:function(a){return e.eidt(t.row)}}},[a("i",{staticClass:"el-icon-edit"})]),e._v(" "),a("el-button",{staticClass:"action-button",attrs:{type:"text"},on:{click:function(a){return e.del(t.row)}}},[a("svg-icon",{attrs:{"icon-class":"shanchu"}})],1)]}}])})],1)],1),e._v(" "),a("div",{staticStyle:{"text-align":"right",margin:"15px 15px"}},[a("el-pagination",{staticClass:"page",attrs:{background:"",layout:"total, prev, pager, next, jumper",total:e.count,"page-size":10,"current-page":e.page},on:{"size-change":e.changePage,"current-change":e.changePage}})],1),e._v(" "),a("el-dialog",{attrs:{visible:e.disAddLeave,width:"30%",title:e.isAdd?"新增":"修改"},on:{"update:visible":function(t){e.disAddLeave=t}}},[e.disAddLeave?a("add-leave",{attrs:{isAdd:e.isAdd,leaveData:e.leaveData},on:{success:function(t){e.disAddLeave=!1,e.getLeaveList()}}}):e._e()],1)],1)},r=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"customers-leave-label"},[a("div",[e._v("\n      团长等级规则：按照累计销售额计算等级升级，升级后产生的订单佣金按照奖励倍数计算\n    ")]),e._v(" "),a("div",[e._v("\n      如：商品佣金比例10%，奖励倍数设置0.1，则100元商品：佣金 = 100 * 10% = 10 + 10 * 0.1 = 11元\n    ")])])}],i=(a("7f7f"),a("9671")),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-form",{ref:"addleaveform",attrs:{rules:e.addRules,model:e.leaveData,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"等级名称",prop:"name"}},[a("el-input",{staticStyle:{"max-width":"70%"},attrs:{placeholder:"请输入等级名称",size:"small"},model:{value:e.leaveData.name,callback:function(t){e.$set(e.leaveData,"name",t)},expression:"leaveData.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"销售额",prop:"min_exp"}},[a("el-input",{staticStyle:{"max-width":"70%"},attrs:{placeholder:"请输入销售额",size:"small"},on:{change:function(t){return e.handleInput("min_exp")}},model:{value:e.leaveData.min_exp,callback:function(t){e.$set(e.leaveData,"min_exp",t)},expression:"leaveData.min_exp"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"奖励倍数",prop:"reward_ratio"}},[a("el-input",{staticStyle:{"max-width":"70%"},attrs:{placeholder:"请输入奖励倍数",size:"small"},on:{change:function(t){return e.handleInput("reward_ratio")}},model:{value:e.leaveData.reward_ratio,callback:function(t){e.$set(e.leaveData,"reward_ratio",t)},expression:"leaveData.reward_ratio"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态"}},[a("el-switch",{attrs:{"active-color":"#13ce66","active-value":"1","inactive-value":"0"},model:{value:e.leaveData.status,callback:function(t){e.$set(e.leaveData,"status",t)},expression:"leaveData.status"}})],1)],1),e._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("el-button",{staticStyle:{padding:"8px 30px"},attrs:{type:"primary",size:"small"},on:{click:e.submit}},[e._v("提 交")])],1)],1)},c=[],u=(a("4917"),a("4360")),o={name:"addLeave",props:{isAdd:{type:Boolean,required:!0,default:!0},leaveData:{type:Object,default:function(){return{key:u["a"].state.app.activeApp.saa_key,type:2,min_exp:"",name:"",reward_ratio:"",status:"1"}}}},data:function(){return{addRules:{name:[{required:!0,message:"请输入等级名称",trigger:"blur"}],min_exp:[{required:!0,message:"请输入销售额",trigger:"blur"}],reward_ratio:[{required:!0,message:"请输入奖励倍数",trigger:"blur"}]}}},methods:{submit:function(){var e=this;this.$refs.addleaveform.validate((function(t){t&&(e.isAdd?Object(i["l"])(e.leaveData).then((function(t){200===t.status?(e.$emit("success"),e.$message.success("添加成功！")):e.$message.error(t.message)})):(console.log(e.leaveData),Object(i["p"])(e.leaveData).then((function(t){200===t.status?(e.$emit("success"),e.$message.success("修改成功！")):e.$message.error(t.message)}))))}))},handleInput:function(e){switch(e){case"min_exp":this.leaveData.min_exp=this.leaveData.min_exp.match(/^\d*(\.?\d{0,2})/g)[0]||null;break;case"reward_ratio":this.leaveData.reward_ratio=this.leaveData.reward_ratio.match(/^\d*(\.?\d{0,2})/g)[0]||null;break}}}},l=o,d=a("2877"),p=Object(d["a"])(l,s,c,!1,null,null,null),v=p.exports,m={name:"customersLeave",components:{addLeave:v},data:function(){return{page:1,count:1,leaveList:[],searchName:"",disAddLeave:!1,isAdd:!0,leaveData:{key:this.$store.state.app.activeApp.saa_key,type:2,min_exp:"",name:"",reward_ratio:"",status:"1"}}},mounted:function(){this.getLeaveList()},methods:{getLeaveList:function(){var e=this,t={key:this.$store.state.app.activeApp.saa_key,type:2,page:this.page,limit:10};Object(i["h"])(t).then((function(t){200===t.status?(e.leaveList=t.data,e.count=parseInt(t.count)):204===t.status?(e.leaveList=[],e.count=1):e.$message.error(t.message)}))},changeStatus:function(e){var t=this,a={key:this.$store.state.app.activeApp.saa_key,id:e.id,status:e.status};Object(i["p"])(a).then((function(e){200===e.status?t.$message.success("修改成功！"):t.$message.error(e.message)}))},del:function(e){var t=this,a={key:this.$store.state.app.activeApp.saa_key,id:e.id};Object(i["a"])(a).then((function(e){200===e.status?(t.getLeaveList(),t.$message.success("删除成功！")):t.$message.error(e.message)}))},add:function(){this.leaveData={key:this.$store.state.app.activeApp.saa_key,type:2,min_exp:"",name:"",reward_ratio:"",status:"1"},this.disAddLeave=!0,this.isAdd=!0},eidt:function(e){this.leaveData={key:this.$store.state.app.activeApp.saa_key,type:2,min_exp:parseInt(e.min_exp),name:e.name,reward_ratio:parseFloat(e.reward_ratio),status:e.status,id:e.id},this.disAddLeave=!0,this.isAdd=!1},changePage:function(e){this.page=e,this.getLeaveList()},search:function(){var e=this,t={key:this.$store.state.app.activeApp.saa_key,type:2,page:1,limit:10,searchName:this.searchName};Object(i["h"])(t).then((function(t){200===t.status?(e.leaveList=t.data,e.count=parseInt(t.count)):204===t.status?(e.leaveList=[],e.count=1):e.$message.error(t.message)}))}}},f=m,h=(a("aea6"),Object(d["a"])(f,n,r,!1,null,"32cade8f",null));t["default"]=h.exports},aea6:function(e,t,a){"use strict";var n=a("8981"),r=a.n(n);r.a},b0c5:function(e,t,a){"use strict";var n=a("520a");a("5ca1")({target:"RegExp",proto:!0,forced:n!==/./.exec},{exec:n})}}]);