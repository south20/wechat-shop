(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67761803"],{"02f4":function(t,e,n){var r=n("4588"),a=n("be13");t.exports=function(t){return function(e,n){var i,c,l=String(a(e)),s=r(n),o=l.length;return s<0||s>=o?t?"":void 0:(i=l.charCodeAt(s),i<55296||i>56319||s+1===o||(c=l.charCodeAt(s+1))<56320||c>57343?t?l.charAt(s):i:t?l.slice(s,s+2):c-56320+(i-55296<<10)+65536)}}},"0390":function(t,e,n){"use strict";var r=n("02f4")(!0);t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},"0bfb":function(t,e,n){"use strict";var r=n("cb7c");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"214f":function(t,e,n){"use strict";n("b0c5");var r=n("2aba"),a=n("32e9"),i=n("79e5"),c=n("be13"),l=n("2b4c"),s=n("520a"),o=l("species"),u=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),p=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();t.exports=function(t,e,n){var f=l(t),h=!i((function(){var e={};return e[f]=function(){return 7},7!=""[t](e)})),g=h?!i((function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[o]=function(){return n}),n[f](""),!e})):void 0;if(!h||!g||"replace"===t&&!u||"split"===t&&!p){var v=/./[f],d=n(c,f,""[t],(function(t,e,n,r,a){return e.exec===s?h&&!a?{done:!0,value:v.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}})),b=d[0],m=d[1];r(String.prototype,t,b),a(RegExp.prototype,f,2==e?function(t,e){return m.call(t,this,e)}:function(t){return m.call(t,this)})}}},"28a5":function(t,e,n){"use strict";var r=n("aae3"),a=n("cb7c"),i=n("ebd6"),c=n("0390"),l=n("9def"),s=n("5f1b"),o=n("520a"),u=n("79e5"),p=Math.min,f=[].push,h="split",g="length",v="lastIndex",d=4294967295,b=!u((function(){RegExp(d,"y")}));n("214f")("split",2,(function(t,e,n,u){var m;return m="c"=="abbc"[h](/(b)*/)[1]||4!="test"[h](/(?:)/,-1)[g]||2!="ab"[h](/(?:ab)*/)[g]||4!="."[h](/(.?)(.?)/)[g]||"."[h](/()()/)[g]>1||""[h](/.?/)[g]?function(t,e){var a=String(this);if(void 0===t&&0===e)return[];if(!r(t))return n.call(a,t,e);var i,c,l,s=[],u=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),p=0,h=void 0===e?d:e>>>0,b=new RegExp(t.source,u+"g");while(i=o.call(b,a)){if(c=b[v],c>p&&(s.push(a.slice(p,i.index)),i[g]>1&&i.index<a[g]&&f.apply(s,i.slice(1)),l=i[0][g],p=c,s[g]>=h))break;b[v]===i.index&&b[v]++}return p===a[g]?!l&&b.test("")||s.push(""):s.push(a.slice(p)),s[g]>h?s.slice(0,h):s}:"0"[h](void 0,0)[g]?function(t,e){return void 0===t&&0===e?[]:n.call(this,t,e)}:n,[function(n,r){var a=t(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,a,r):m.call(String(a),n,r)},function(t,e){var r=u(m,t,this,e,m!==n);if(r.done)return r.value;var o=a(t),f=String(this),h=i(o,RegExp),g=o.unicode,v=(o.ignoreCase?"i":"")+(o.multiline?"m":"")+(o.unicode?"u":"")+(b?"y":"g"),y=new h(b?o:"^(?:"+o.source+")",v),x=void 0===e?d:e>>>0;if(0===x)return[];if(0===f.length)return null===s(y,f)?[f]:[];var S=0,_=0,k=[];while(_<f.length){y.lastIndex=b?_:0;var w,E=s(y,b?f:f.slice(_));if(null===E||(w=p(l(y.lastIndex+(b?0:_)),f.length))===S)_=c(f,_,g);else{if(k.push(f.slice(S,_)),k.length===x)return k;for(var R=1;R<=E.length-1;R++)if(k.push(E[R]),k.length===x)return k;_=S=w}}return k.push(f.slice(S)),k}]}))},"28c6":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vip-list-container"},[n("div",{staticClass:"vip-list-top"},[n("el-row",[n("el-col",{attrs:{span:5}},[n("div",{staticClass:"vip-list-top-col"},[n("span",{staticStyle:{padding:"0 5px"}},[t._v("统计方式")]),t._v(" "),n("el-radio",{staticStyle:{"margin-top":"10px"},attrs:{label:"1"},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},[t._v("按年统计")]),t._v(" "),n("el-radio",{staticStyle:{"margin-top":"10px"},attrs:{label:"2"},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},[t._v("按月统计")])],1)]),t._v(" "),n("el-col",{attrs:{span:3}},[n("div",{staticClass:"order-manage-top-col",staticStyle:{"padding-left":"0"}},[n("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"month",size:"small"},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1)]),t._v(" "),n("el-col",{attrs:{span:2}},[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.search}},[t._v("搜索")])],1),t._v(" "),n("el-col",{staticStyle:{float:"right"},attrs:{span:2}},[n("a",{attrs:{href:t.export_url,target:"_blank"},on:{click:t.export_data}},[t._v("导出")])])],1)],1),t._v(" "),n("div",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list,stripe:""}},[n("el-table-column",{attrs:{prop:"time",label:"月/日",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"money",label:"交易额",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"total",label:"交易量",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"cost",label:"成本",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"express_price",label:"运费",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"refund_money",label:"退款",align:"center"}})],1)],1),t._v(" "),n("div",{staticStyle:{"text-align":"right",margin:"15px 15px"}},[n("el-pagination",{staticClass:"page",attrs:{background:"",layout:"total, prev, pager, next, jumper",total:t.count,"page-size":t.limit,"current-page":t.page},on:{"size-change":t.changePage,"current-change":t.changePage}})],1)])},a=[],i=n("48fb"),c=n("ed08"),l={name:"vipList",data:function(){return{count:0,list:[],key:this.$store.state.app.activeApp.saa_key,limit:20,page:1,type:"1",year:"",month:"",time:"",export_url:""}},watch:{time:function(t){null!==t?(this.year=Object(c["a"])(t,"{y}"),"2"===this.type&&(this.month=Object(c["a"])(t,"{m}"))):(this.year="",this.month="")}},mounted:function(){this.getSales()},methods:{getSales:function(){var t=this,e={key:this.key,page:this.page,limit:this.limit};Object(i["c"])(e).then((function(e){if(200===e.status){for(var n in t.list=[],e.data)t.list.push(e.data[n]);t.count=t.list.length}else 204===e.status?t.list=[]:t.$message.error(e.message)}))},search:function(){var t=this;this.params={key:this.key,year:this.year,type:this.type},"2"===this.type&&(this.params.month=this.month),Object(i["c"])(this.params).then((function(e){if(200===e.status)for(var n in t.list=[],e.data)t.list.push(e.data[n]);else 204===e.status?t.list=[]:t.$message.error(e.message)}))},export_data:function(){this.export_url="/api/web/index.php/salesExport?key="+this.key+"&type="+this.type+"&year="+this.year,"2"===this.type&&(this.export_url+="&month="+this.month)},changePage:function(t){this.page=t,this.getSales()}}},s=l,o=(n("a12c"),n("2877")),u=Object(o["a"])(s,r,a,!1,null,"8ca88448",null);e["default"]=u.exports},3846:function(t,e,n){n("9e1e")&&"g"!=/./g.flags&&n("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:n("0bfb")})},"48fb":function(t,e,n){"use strict";n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return c})),n.d(e,"d",(function(){return l}));var r=n("b775");function a(t){return Object(r["a"])({url:"/sales",method:"get",params:t})}function i(t){return Object(r["a"])({url:"/goodsSales",method:"get",params:t})}function c(t){return Object(r["a"])({url:"/leaderSales",method:"get",params:t})}function l(t){return Object(r["a"])({url:"/userSales",method:"get",params:t})}},"520a":function(t,e,n){"use strict";var r=n("0bfb"),a=RegExp.prototype.exec,i=String.prototype.replace,c=a,l="lastIndex",s=function(){var t=/a/,e=/b*/g;return a.call(t,"a"),a.call(e,"a"),0!==t[l]||0!==e[l]}(),o=void 0!==/()??/.exec("")[1],u=s||o;u&&(c=function(t){var e,n,c,u,p=this;return o&&(n=new RegExp("^"+p.source+"$(?!\\s)",r.call(p))),s&&(e=p[l]),c=a.call(p,t),s&&c&&(p[l]=p.global?c.index+c[0].length:e),o&&c&&c.length>1&&i.call(c[0],n,(function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(c[u]=void 0)})),c}),t.exports=c},"5f1b":function(t,e,n){"use strict";var r=n("23c6"),a=RegExp.prototype.exec;t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var i=n.call(t,e);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(t))throw new TypeError("RegExp#exec called on incompatible receiver");return a.call(t,e)}},"6b54":function(t,e,n){"use strict";n("3846");var r=n("cb7c"),a=n("0bfb"),i=n("9e1e"),c="toString",l=/./[c],s=function(t){n("2aba")(RegExp.prototype,c,t,!0)};n("79e5")((function(){return"/a/b"!=l.call({source:"a",flags:"b"})}))?s((function(){var t=r(this);return"/".concat(t.source,"/","flags"in t?t.flags:!i&&t instanceof RegExp?a.call(t):void 0)})):l.name!=c&&s((function(){return l.call(this)}))},a12c:function(t,e,n){"use strict";var r=n("f291"),a=n.n(r);a.a},a481:function(t,e,n){"use strict";var r=n("cb7c"),a=n("4bf8"),i=n("9def"),c=n("4588"),l=n("0390"),s=n("5f1b"),o=Math.max,u=Math.min,p=Math.floor,f=/\$([$&`']|\d\d?|<[^>]*>)/g,h=/\$([$&`']|\d\d?)/g,g=function(t){return void 0===t?t:String(t)};n("214f")("replace",2,(function(t,e,n,v){return[function(r,a){var i=t(this),c=void 0==r?void 0:r[e];return void 0!==c?c.call(r,i,a):n.call(String(i),r,a)},function(t,e){var a=v(n,t,this,e);if(a.done)return a.value;var p=r(t),f=String(this),h="function"===typeof e;h||(e=String(e));var b=p.global;if(b){var m=p.unicode;p.lastIndex=0}var y=[];while(1){var x=s(p,f);if(null===x)break;if(y.push(x),!b)break;var S=String(x[0]);""===S&&(p.lastIndex=l(f,i(p.lastIndex),m))}for(var _="",k=0,w=0;w<y.length;w++){x=y[w];for(var E=String(x[0]),R=o(u(c(x.index),f.length),0),j=[],$=1;$<x.length;$++)j.push(g(x[$]));var O=x.groups;if(h){var C=[E].concat(j,R,f);void 0!==O&&C.push(O);var I=String(e.apply(void 0,C))}else I=d(E,f,R,j,O,e);R>=k&&(_+=f.slice(k,R)+I,k=R+E.length)}return _+f.slice(k)}];function d(t,e,r,i,c,l){var s=r+t.length,o=i.length,u=h;return void 0!==c&&(c=a(c),u=f),n.call(l,u,(function(n,a){var l;switch(a.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,r);case"'":return e.slice(s);case"<":l=c[a.slice(1,-1)];break;default:var u=+a;if(0===u)return n;if(u>o){var f=p(u/10);return 0===f?n:f<=o?void 0===i[f-1]?a.charAt(1):i[f-1]+a.charAt(1):n}l=i[u-1]}return void 0===l?"":l}))}}))},aae3:function(t,e,n){var r=n("d3f4"),a=n("2d95"),i=n("2b4c")("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==a(t))}},b0c5:function(t,e,n){"use strict";var r=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},ed08:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n("28a5"),n("a481"),n("6b54");var r=n("7618");function a(t,e){if(0===arguments.length)return null;var n,a=e||"{y}-{m}-{d} {h}:{i}:{s}";"object"===Object(r["a"])(t)?n=t:("string"===typeof t&&/^[0-9]+$/.test(t)&&(t=parseInt(t)),"number"===typeof t&&10===t.toString().length&&(t*=1e3),n=new Date(t));var i={y:n.getFullYear(),m:n.getMonth()+1,d:n.getDate(),h:n.getHours(),i:n.getMinutes(),s:n.getSeconds(),a:n.getDay()},c=a.replace(/{(y|m|d|h|i|s|a)+}/g,(function(t,e){var n=i[e];return"a"===e?["日","一","二","三","四","五","六"][n]:(t.length>0&&n<10&&(n="0"+n),n||0)}));return c}},f291:function(t,e,n){}}]);