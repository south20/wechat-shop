(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a89a8f5a"],{"0268":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vip-list-container"},[n("div",{staticClass:"vip-list-top"},[n("el-row",[n("el-col",{attrs:{span:5}},[n("div",{staticClass:"vip-list-top-col"},[n("span",{staticStyle:{padding:"0 5px"}},[t._v("ID/昵称")]),t._v(" "),n("el-input",{attrs:{placeholder:"请输入ID/昵称",size:"small"},model:{value:t.vipParams.searchName,callback:function(e){t.$set(t.vipParams,"searchName",e)},expression:"vipParams.searchName"}})],1)]),t._v(" "),n("el-col",{attrs:{span:5}},[n("div",{staticClass:"vip-list-top-col"},[n("span",{staticStyle:{padding:"0 5px"}},[t._v("手机号")]),t._v(" "),n("el-input",{attrs:{placeholder:"请输入手机号",size:"small"},model:{value:t.vipParams.phone,callback:function(e){t.$set(t.vipParams,"phone",e)},expression:"vipParams.phone"}})],1)]),t._v(" "),n("el-col",{attrs:{span:5}},[n("div",{staticClass:"vip-list-top-col"},[n("span",{staticStyle:{padding:"0 5px"}},[t._v("团长")]),t._v(" "),n("el-input",{attrs:{placeholder:"请输入团长",size:"small"},model:{value:t.vipParams.realname,callback:function(e){t.$set(t.vipParams,"realname",e)},expression:"vipParams.realname"}})],1)]),t._v(" "),n("el-col",{attrs:{span:7}},[n("div",{staticClass:"order-manage-top-col",staticStyle:{"padding-left":"0"}},[n("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetimerange","picker-options":t.pickerOptions,"range-separator":"至","start-placeholde":"开始时间","end-placeholde":"结束时间",size:"small"},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1)]),t._v(" "),n("el-col",{attrs:{span:2}},[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.search}},[t._v("搜索")])],1)],1)],1),t._v(" "),n("div",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.vipList,stripe:""}},[n("el-table-column",{attrs:{type:"selection",width:"30px"}}),t._v(" "),n("el-table-column",{attrs:{prop:"id",label:"ID",align:"center",width:"80px"}}),t._v(" "),n("el-table-column",{attrs:{label:"头像",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("l-pic",{attrs:{picurl:t.row.avatar,size:{width:40,height:40},disdel:!1,disview:!1}})]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"昵称姓名"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",[n("span",[t._v("昵称：")]),t._v(" "),n("span",[t._v(t._s(e.row.nickname))])]),t._v(" "),n("div",[n("span",[t._v("团长：")]),t._v(" "),n("span",[t._v("\n              "+t._s(null===e.row.realname?"无团长":e.row.realname)+"\n            ")])]),t._v(" "),n("div",[n("span",[t._v("上级：")]),t._v(" "),n("span",[t._v("\n              "+t._s(null===e.row.parent_name?"无上级":e.row.parent_name)+"\n            ")])])]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"level_name",label:"会员等级",align:"center",width:"80px"}}),t._v(" "),n("el-table-column",{attrs:{label:"账户"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",[n("span",[t._v("余额：")]),t._v(" "),n("span",[t._v(t._s(e.row.recharge_balance))])]),t._v(" "),n("div",[n("span",[t._v("积分：")]),t._v(" "),n("span",[t._v(t._s(e.row.score))])])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"收件地址信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",[n("span",[t._v("手机号：")]),t._v(" "),n("span",[t._v(t._s(null===e.row.phone?"暂无信息":e.row.phone))])]),t._v(" "),n("div",[n("span",[t._v("地区：")]),t._v(" "),n("span",[t._v(t._s(null===e.row.pca?"暂无信息":e.row.pca))])]),t._v(" "),n("div",[n("span",[t._v("地址：")]),t._v(" "),n("span",[t._v("\n              "+t._s(null===e.row.address?"暂无信息":e.row.address)+"\n            ")])])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"订单消费"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",[n("span",[t._v("总金额：")]),t._v(" "),n("span",[t._v(t._s(e.row.pay_price))])]),t._v(" "),n("div",[n("span",[t._v("总订单：")]),t._v(" "),n("span",[t._v(t._s(e.row.pay_num))])]),t._v(" "),n("div",[n("span",[t._v("购物车：")]),t._v(" "),n("span",[t._v(t._s(e.row.cart_num))])])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"佣金"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",[n("span",[t._v("预估佣金：")]),t._v(" "),n("span",[t._v(t._s(e.row.commission))])]),t._v(" "),n("div",[n("span",[t._v("待提现佣金：")]),t._v(" "),n("span",[t._v(t._s(e.row.withdrawable_commission))])])]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"create_time",label:"注册时间",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticStyle:{padding:"3px 10px"},attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(n){return t.openList(e.row)}}},[t._v("编辑")]),t._v(" "),n("el-button",{staticStyle:{padding:"3px 10px"},attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(n){return t.gotoOrder(e.row)}}},[t._v("订单")])]}}])})],1)],1),t._v(" "),n("div",{staticStyle:{"text-align":"right",margin:"15px 15px"}},[n("el-pagination",{staticClass:"page",attrs:{background:"",layout:"total, prev, pager, next, jumper",total:t.count,"page-size":10,"current-page":t.page},on:{"size-change":t.changePage,"current-change":t.changePage}})],1),t._v(" "),[n("el-dialog",{attrs:{visible:t.isShow,title:"修改会员上级"},on:{"update:visible":function(e){t.isShow=e}}},[n("el-input",{staticStyle:{width:"280px"},attrs:{placeholder:"会员昵称",size:"small"},model:{value:t.distributor.nickname,callback:function(e){t.$set(t.distributor,"nickname",e)},expression:"distributor.nickname"}},[n("el-button",{attrs:{slot:"append",icon:"el-icon-search",size:"small"},on:{click:t.searchDis},slot:"append"})],1),t._v(" "),n("div",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.distributor,stripe:""}},[n("el-table-column",{attrs:{prop:"id",label:"ID",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"nickname",label:"分销商姓名",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticClass:"action-button",attrs:{type:"text"},on:{click:function(n){return t.choice(e.row)}}},[t._v("选择")])]}}])})],1)],1)],1)]],2)},r=[],i=n("98e1"),s=n("334a"),c=n("ed08"),o={name:"vipList",components:{LPic:s["a"]},data:function(){return{props:{vipList:{type:Object,required:!0}},isShow:!1,vipList:[],distributor:[],page:1,count:1,searchName:"",vipParams:{key:this.$store.state.app.activeApp.saa_key,limit:10,page:1,phone:"",realname:"",time:""},time:"",pickerOptions:{shortcuts:[{text:"近7天",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-6048e5),t.$emit("pick",[n,e])}},{text:"近30天",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-2592e6),t.$emit("pick",[n,e])}}]}}},watch:{time:function(t){if(null!==t){var e=Object(c["a"])(t[0],"{y}-{m}-{d} {h}:{i}:{s}"),n=Object(c["a"])(t[1],"{y}-{m}-{d} {h}:{i}:{s}");this.vipParams.time=e+" - "+n}else this.vipParams.time=""}},mounted:function(){this.getVipList()},methods:{getVipList:function(){var t=this,e={key:this.$store.state.app.activeApp.saa_key,page:this.page,limit:10};Object(i["e"])(e).then((function(e){200===e.status?(t.vipList=e.data,t.count=parseInt(e.count)):204===e.status?(t.vipList=[],t.count=1):t.$message.error(e.message)}))},getDistributor:function(){var t=this,e={key:this.$store.state.app.activeApp.saa_key,searchName:this.distributor.nickname};Object(i["b"])(e).then((function(e){200===e.status?t.distributor=e.data:204===e.status?t.distributor=[]:t.$message.error(e.message)}))},putShopUsersSuperior:function(t){var e=this,n={key:this.$store.state.app.activeApp.saa_key,parent_id:t.id,id:this.vip_id};Object(i["g"])(n).then((function(t){200===t.status?(e.$message.success("修改成功"),e.isShow=!1,e.getVipList()):e.$message.error(t.message)}))},openList:function(t){this.vip_id=t.id,this.isShow=!0,this.getDistributor()},choice:function(t){this.putShopUsersSuperior(t)},search:function(){var t=this;Object(i["e"])(this.vipParams).then((function(e){200===e.status?(t.vipList=e.data,t.count=parseInt(e.count)):204===e.status?(t.vipList=[],t.count=1):t.$message.error(e.message)}))},searchDis:function(){this.getDistributor()},gotoOrder:function(t){this.$router.push({path:"/order/manage?id="+t.id})},changePage:function(t){this.page=t,this.getVipList()}}},l=o,u=(n("c8d8"),n("2877")),p=Object(u["a"])(l,a,r,!1,null,"1253efe2",null);e["default"]=p.exports},"02f4":function(t,e,n){var a=n("4588"),r=n("be13");t.exports=function(t){return function(e,n){var i,s,c=String(r(e)),o=a(n),l=c.length;return o<0||o>=l?t?"":void 0:(i=c.charCodeAt(o),i<55296||i>56319||o+1===l||(s=c.charCodeAt(o+1))<56320||s>57343?t?c.charAt(o):i:t?c.slice(o,o+2):s-56320+(i-55296<<10)+65536)}}},"0390":function(t,e,n){"use strict";var a=n("02f4")(!0);t.exports=function(t,e,n){return e+(n?a(t,e).length:1)}},"0bfb":function(t,e,n){"use strict";var a=n("cb7c");t.exports=function(){var t=a(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"214f":function(t,e,n){"use strict";n("b0c5");var a=n("2aba"),r=n("32e9"),i=n("79e5"),s=n("be13"),c=n("2b4c"),o=n("520a"),l=c("species"),u=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),p=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();t.exports=function(t,e,n){var v=c(t),d=!i((function(){var e={};return e[v]=function(){return 7},7!=""[t](e)})),f=d?!i((function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[l]=function(){return n}),n[v](""),!e})):void 0;if(!d||!f||"replace"===t&&!u||"split"===t&&!p){var h=/./[v],g=n(s,v,""[t],(function(t,e,n,a,r){return e.exec===o?d&&!r?{done:!0,value:h.call(e,n,a)}:{done:!0,value:t.call(n,e,a)}:{done:!1}})),m=g[0],b=g[1];a(String.prototype,t,m),r(RegExp.prototype,v,2==e?function(t,e){return b.call(t,this,e)}:function(t){return b.call(t,this)})}}},"28a5":function(t,e,n){"use strict";var a=n("aae3"),r=n("cb7c"),i=n("ebd6"),s=n("0390"),c=n("9def"),o=n("5f1b"),l=n("520a"),u=n("79e5"),p=Math.min,v=[].push,d="split",f="length",h="lastIndex",g=4294967295,m=!u((function(){RegExp(g,"y")}));n("214f")("split",2,(function(t,e,n,u){var b;return b="c"=="abbc"[d](/(b)*/)[1]||4!="test"[d](/(?:)/,-1)[f]||2!="ab"[d](/(?:ab)*/)[f]||4!="."[d](/(.?)(.?)/)[f]||"."[d](/()()/)[f]>1||""[d](/.?/)[f]?function(t,e){var r=String(this);if(void 0===t&&0===e)return[];if(!a(t))return n.call(r,t,e);var i,s,c,o=[],u=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),p=0,d=void 0===e?g:e>>>0,m=new RegExp(t.source,u+"g");while(i=l.call(m,r)){if(s=m[h],s>p&&(o.push(r.slice(p,i.index)),i[f]>1&&i.index<r[f]&&v.apply(o,i.slice(1)),c=i[0][f],p=s,o[f]>=d))break;m[h]===i.index&&m[h]++}return p===r[f]?!c&&m.test("")||o.push(""):o.push(r.slice(p)),o[f]>d?o.slice(0,d):o}:"0"[d](void 0,0)[f]?function(t,e){return void 0===t&&0===e?[]:n.call(this,t,e)}:n,[function(n,a){var r=t(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,r,a):b.call(String(r),n,a)},function(t,e){var a=u(b,t,this,e,b!==n);if(a.done)return a.value;var l=r(t),v=String(this),d=i(l,RegExp),f=l.unicode,h=(l.ignoreCase?"i":"")+(l.multiline?"m":"")+(l.unicode?"u":"")+(m?"y":"g"),_=new d(m?l:"^(?:"+l.source+")",h),x=void 0===e?g:e>>>0;if(0===x)return[];if(0===v.length)return null===o(_,v)?[v]:[];var y=0,w=0,k=[];while(w<v.length){_.lastIndex=m?w:0;var S,$=o(_,m?v:v.slice(w));if(null===$||(S=p(c(_.lastIndex+(m?0:w)),v.length))===y)w=s(v,w,f);else{if(k.push(v.slice(y,w)),k.length===x)return k;for(var j=1;j<=$.length-1;j++)if(k.push($[j]),k.length===x)return k;w=y=S}}return k.push(v.slice(y)),k}]}))},3846:function(t,e,n){n("9e1e")&&"g"!=/./g.flags&&n("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:n("0bfb")})},"504c":function(t,e,n){var a=n("9e1e"),r=n("0d58"),i=n("6821"),s=n("52a7").f;t.exports=function(t){return function(e){var n,c=i(e),o=r(c),l=o.length,u=0,p=[];while(l>u)n=o[u++],a&&!s.call(c,n)||p.push(t?[n,c[n]]:c[n]);return p}}},"520a":function(t,e,n){"use strict";var a=n("0bfb"),r=RegExp.prototype.exec,i=String.prototype.replace,s=r,c="lastIndex",o=function(){var t=/a/,e=/b*/g;return r.call(t,"a"),r.call(e,"a"),0!==t[c]||0!==e[c]}(),l=void 0!==/()??/.exec("")[1],u=o||l;u&&(s=function(t){var e,n,s,u,p=this;return l&&(n=new RegExp("^"+p.source+"$(?!\\s)",a.call(p))),o&&(e=p[c]),s=r.call(p,t),o&&s&&(p[c]=p.global?s.index+s[0].length:e),l&&s&&s.length>1&&i.call(s[0],n,(function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(s[u]=void 0)})),s}),t.exports=s},"5f1b":function(t,e,n){"use strict";var a=n("23c6"),r=RegExp.prototype.exec;t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var i=n.call(t,e);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==a(t))throw new TypeError("RegExp#exec called on incompatible receiver");return r.call(t,e)}},"6b54":function(t,e,n){"use strict";n("3846");var a=n("cb7c"),r=n("0bfb"),i=n("9e1e"),s="toString",c=/./[s],o=function(t){n("2aba")(RegExp.prototype,s,t,!0)};n("79e5")((function(){return"/a/b"!=c.call({source:"a",flags:"b"})}))?o((function(){var t=a(this);return"/".concat(t.source,"/","flags"in t?t.flags:!i&&t instanceof RegExp?r.call(t):void 0)})):c.name!=s&&o((function(){return c.call(this)}))},"7f89":function(t,e,n){},8615:function(t,e,n){var a=n("5ca1"),r=n("504c")(!1);a(a.S,"Object",{values:function(t){return r(t)}})},"98e1":function(t,e,n){"use strict";n.d(e,"e",(function(){return r})),n.d(e,"b",(function(){return i})),n.d(e,"g",(function(){return s})),n.d(e,"j",(function(){return c})),n.d(e,"i",(function(){return o})),n.d(e,"c",(function(){return l})),n.d(e,"d",(function(){return u})),n.d(e,"f",(function(){return p})),n.d(e,"h",(function(){return v})),n.d(e,"a",(function(){return d}));var a=n("b775");function r(t){return Object(a["a"])({url:"/merchantShopUsers",method:"get",params:t})}function i(t){return Object(a["a"])({url:"/merchantDistributor",method:"get",params:t})}function s(t){var e=t.id;return delete t.id,Object(a["a"])({url:"/merchantShopUsersSuperior/"+e,method:"put",data:t})}function c(t){return Object(a["a"])({url:"/merchantVipPlugin",method:"get",params:t})}function o(t){var e=t.id;return delete t.id,Object(a["a"])({url:"/merchantVipPlugin/"+e,method:"put",data:t})}function l(t){return Object(a["a"])({url:"/shopVouTypes",method:"get",params:t})}function u(t){return Object(a["a"])({url:"/unpaidVips",method:"get",params:t})}function p(t){return Object(a["a"])({url:"/unpaidVips",method:"post",data:t})}function v(t){var e=t.id;return delete t.id,Object(a["a"])({url:"/unpaidVips/"+e,method:"put",data:t})}function d(t){var e=t.id;return delete t.id,Object(a["a"])({url:"/unpaidVips/"+e,method:"delete",data:t})}},a481:function(t,e,n){"use strict";var a=n("cb7c"),r=n("4bf8"),i=n("9def"),s=n("4588"),c=n("0390"),o=n("5f1b"),l=Math.max,u=Math.min,p=Math.floor,v=/\$([$&`']|\d\d?|<[^>]*>)/g,d=/\$([$&`']|\d\d?)/g,f=function(t){return void 0===t?t:String(t)};n("214f")("replace",2,(function(t,e,n,h){return[function(a,r){var i=t(this),s=void 0==a?void 0:a[e];return void 0!==s?s.call(a,i,r):n.call(String(i),a,r)},function(t,e){var r=h(n,t,this,e);if(r.done)return r.value;var p=a(t),v=String(this),d="function"===typeof e;d||(e=String(e));var m=p.global;if(m){var b=p.unicode;p.lastIndex=0}var _=[];while(1){var x=o(p,v);if(null===x)break;if(_.push(x),!m)break;var y=String(x[0]);""===y&&(p.lastIndex=c(v,i(p.lastIndex),b))}for(var w="",k=0,S=0;S<_.length;S++){x=_[S];for(var $=String(x[0]),j=l(u(s(x.index),v.length),0),O=[],P=1;P<x.length;P++)O.push(f(x[P]));var E=x.groups;if(d){var D=[$].concat(O,j,v);void 0!==E&&D.push(E);var C=String(e.apply(void 0,D))}else C=g($,v,j,O,E,e);j>=k&&(w+=v.slice(k,j)+C,k=j+$.length)}return w+v.slice(k)}];function g(t,e,a,i,s,c){var o=a+t.length,l=i.length,u=d;return void 0!==s&&(s=r(s),u=v),n.call(c,u,(function(n,r){var c;switch(r.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,a);case"'":return e.slice(o);case"<":c=s[r.slice(1,-1)];break;default:var u=+r;if(0===u)return n;if(u>l){var v=p(u/10);return 0===v?n:v<=l?void 0===i[v-1]?r.charAt(1):i[v-1]+r.charAt(1):n}c=i[u-1]}return void 0===c?"":c}))}}))},aae3:function(t,e,n){var a=n("d3f4"),r=n("2d95"),i=n("2b4c")("match");t.exports=function(t){var e;return a(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==r(t))}},b0c5:function(t,e,n){"use strict";var a=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:a!==/./.exec},{exec:a})},c8d8:function(t,e,n){"use strict";var a=n("7f89"),r=n.n(a);r.a},ed08:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));n("28a5"),n("a481"),n("6b54");var a=n("53ca");function r(t,e){if(0===arguments.length)return null;var n,r=e||"{y}-{m}-{d} {h}:{i}:{s}";"object"===Object(a["a"])(t)?n=t:("string"===typeof t&&/^[0-9]+$/.test(t)&&(t=parseInt(t)),"number"===typeof t&&10===t.toString().length&&(t*=1e3),n=new Date(t));var i={y:n.getFullYear(),m:n.getMonth()+1,d:n.getDate(),h:n.getHours(),i:n.getMinutes(),s:n.getSeconds(),a:n.getDay()},s=r.replace(/{(y|m|d|h|i|s|a)+}/g,(function(t,e){var n=i[e];return"a"===e?["日","一","二","三","四","五","六"][n]:(t.length>0&&n<10&&(n="0"+n),n||0)}));return s}}}]);