(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f0c30e3a"],{"04f2":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"setting-yly-container"},[a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.logList,stripe:""}},[a("el-table-column",{attrs:{prop:"merchant_id",label:"操作人ID",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"operation_type",label:"操作类型",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"operation_id",label:"被操作数据ID",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"module_name",label:"操作模块",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"format_create_time",label:"创建时间",align:"center"}})],1)],1),t._v(" "),a("div",{staticStyle:{"text-align":"right",margin:"15px 15px"}},[a("el-pagination",{staticClass:"page",attrs:{background:"",layout:"total, prev, pager, next, jumper",total:t.count,"page-size":12,"current-page":t.page},on:{"size-change":t.changePage,"current-change":t.changePage}})],1)])},i=[],r=a("b775");function l(t){return Object(r["a"])({url:"/Operation",method:"get",params:t})}var s={name:"setting-yly",data:function(){return{page:1,count:1,logList:[]}},mounted:function(){this.getLogList()},methods:{getLogList:function(){var t=this,e={key:this.$store.state.app.activeApp.saa_key,page:this.page,limit:12};l(e).then((function(e){200===e.status?(t.logList=e.data,t.count=parseInt(e.count)):204===e.status?(t.logList=[],t.count=1):t.$message.error(e.message)}))},changePage:function(t){this.page=t,this.getLogList()}}},o=s,c=(a("dd86"),a("2877")),g=Object(c["a"])(o,n,i,!1,null,"31683342",null);e["default"]=g.exports},"1d1f":function(t,e,a){},dd86:function(t,e,a){"use strict";var n=a("1d1f"),i=a.n(n);i.a}}]);