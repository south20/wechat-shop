(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cff95bc8"],{"6fea":function(t,e,n){"use strict";var o=n("f6f1"),a=n.n(o);a.a},"9fe2":function(t,e,n){},ad92:function(t,e,n){"use strict";var o=n("9fe2"),a=n.n(o);a.a},ceb8:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[t._m(0),t._v(" "),n("div",{staticClass:"procontainer"},[n("div",{staticClass:"help",on:{click:t.gohelp}},[n("svg-icon",{staticStyle:{"font-size":"20px",position:"relative",top:"3px"},attrs:{"icon-class":"bangzhu"}}),t._v(" "),n("div",[t._v("帮助教程")])],1),t._v(" "),n("div",{staticClass:"setting"},[n("div",[n("svg-icon",{staticStyle:{"font-size":"25px",position:"relative",top:"3px"},attrs:{"icon-class":"morentouxiang"}}),t._v(" "),n("el-dropdown",{on:{command:t.handleCommand}},[n("span",{staticStyle:{cursor:"pointer"}},[t._v("\n                            "+t._s(t.name)),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{attrs:{command:1}},[t._v("基本资料")]),t._v(" "),n("el-dropdown-item",{attrs:{command:3,divided:""}},[t._v("退 出")])],1)],1)],1)])])])},a=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"proName"},[o("img",{staticClass:"logo_url_login",staticStyle:{width:"95px",height:"35px",margin:"12.5px 0 0 60px"},attrs:{src:n("dd88"),alt:""}})])}],i=(n("7f7f"),{name:"Navbar",data:function(){return{name:this.$store.state.user.name}},mounted:function(){this.setImgUrl()},methods:{handleCommand:function(t){switch(t){case 1:this.$router.push({path:"/info/updatePW"});break;case 3:this.$store.dispatch("user/logout");break}},goToOld:function(){window.location.href="https://web.juanpao.com/adminMerchant"},gohelp:function(){console.log("todo"),window.location.href="http://wen.juanpao.cn/web/#/1?page_id=1"},setImgUrl:function(){if(sessionStorage.getItem("copyright")){var t=JSON.parse(sessionStorage.getItem("copyright"));if(t.logo_url){var e=document.body.querySelector("img[class=logo_url_login]");e&&(e.src=t.logo_url)}}}}}),s=i,r=(n("6fea"),n("2877")),c=Object(r["a"])(s,o,a,!1,null,"7da1d2a8",null);e["a"]=c.exports},dd88:function(t,e,n){t.exports=n.p+"static/img/logo2.4a842ec4.png"},f6f1:function(t,e,n){},f82c:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{height:"100%"}},[n("div",{staticClass:"header"},[n("navbar")],1),t._v(" "),n("div",{staticClass:"app-container"},[n("transition",{attrs:{name:"fade-transform",mode:"out-in"}},[n("router-view",{key:t.key})],1)],1)])},a=[],i=n("ceb8"),s={name:"app",components:{Navbar:i["a"]},computed:{key:function(){return this.$route.path}}},r=s,c=(n("ad92"),n("2877")),l=Object(c["a"])(r,o,a,!1,null,"4372ba79",null);e["default"]=l.exports}}]);