(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-000df844"],{"6e36":function(t,e,n){},8365:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"goods-group-container"},[n("div",{staticClass:"goods-group-top"},[n("el-button",{staticClass:"goods-group-top-add",attrs:{type:"primary",size:"small"},on:{click:function(e){t.rowData={title:"",status:"1"},t.openAdd=!0,t.isAdd=!0,t.title="新增"}}},[t._v("新增")])],1),t._v(" "),n("div",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list,stripe:""}},[n("el-table-column",{attrs:{prop:"title",label:"标签名称",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"format_create_time",label:"创建时间",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-switch",{attrs:{"active-color":"#13ce66","active-value":"1","inactive-value":"0"},on:{change:function(n){return t.changeStatus(e.row)}},model:{value:e.row.status,callback:function(n){t.$set(e.row,"status",n)},expression:"scope.row.status"}})]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticClass:"action-button",attrs:{type:"text"},on:{click:function(n){return t.edit(e.row)}}},[n("i",{staticClass:"el-icon-edit"})]),t._v(" "),n("el-button",{staticClass:"action-button",attrs:{type:"text"},on:{click:function(n){return t.del(e.row.id)}}},[n("svg-icon",{attrs:{"icon-class":"shanchu"}})],1)]}}])})],1)],1),t._v(" "),n("el-dialog",{attrs:{visible:t.openAdd,title:t.title,width:"400px",center:""},on:{"update:visible":function(e){t.openAdd=e}}},[t.openAdd?n("add",{attrs:{isAdd:t.isAdd,rowData:t.rowData},on:{success:function(e){t.openAdd=!1,t.getGoodsLabel()}}}):t._e()],1)],1)},a=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-form",{ref:"rowForm",attrs:{model:t.rowData,rules:t.rowRules,"label-position":"right","label-width":"80px"}},[n("el-form-item",{attrs:{label:"标签名称",prop:"title"}},[n("el-input",{staticStyle:{width:"240px"},attrs:{placeholder:"请输入",size:"small"},model:{value:t.rowData.title,callback:function(e){t.$set(t.rowData,"title",e)},expression:"rowData.title"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"状态"}},[n("el-switch",{attrs:{"active-color":"#13ce66","active-value":"1","inactive-value":"0"},model:{value:t.rowData.status,callback:function(e){t.$set(t.rowData,"status",e)},expression:"rowData.status"}})],1),t._v(" "),n("div",{staticStyle:{"text-align":"center"}},[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.submit}},[t._v("提 交")])],1)],1)],1)},u=[],i=n("c40e"),c={name:"add",props:{rowData:{type:Object,required:!1},isAdd:{type:Boolean,required:!0,default:!0}},data:function(){return{rowRules:{title:[{required:!0,maxlength:5,trigger:"blur",message:"请填写商品标签"},{maxlength:5,trigger:"blur",message:"商品标签最多输入5个字"}]}}},methods:{submit:function(){var t=this;this.$refs.rowForm.validate((function(e){if(e){if(t.rowData.title.length>5)return void t.$message.warning("最多输入5个字符");var n={title:t.rowData.title,status:t.rowData.status,key:t.$store.state.app.activeApp.saa_key};t.isAdd?Object(i["r"])(n).then((function(e){200===e.status?(t.$message.success("添加成功！"),t.$emit("success")):t.$message.error(e.message)})):(n.id=t.rowData.id,Object(i["y"])(n).then((function(e){200===e.status?(t.$message.success("修改成功"),t.$emit("success")):t.$message.error(e.message)})))}}))}}},s=c,d=n("2877"),l=Object(d["a"])(s,o,u,!1,null,null,null),m=l.exports,f={name:"goodsLabel",components:{Add:m},data:function(){return{key:this.$store.state.app.activeApp.saa_key,openAdd:!1,title:"添加",isAdd:!0,list:[],rowData:{title:"",status:"1"}}},mounted:function(){this.getGoodsLabel()},methods:{getGoodsLabel:function(){var t=this,e={key:this.key,limit:!1};Object(i["i"])(e).then((function(e){200===e.status?t.list=e.data:204===e.status?t.list=[]:t.$message.error(e.msg)}))},edit:function(t){this.rowData=t,this.openAdd=!0,this.isAdd=!1,this.title="编辑"},changeStatus:function(t){var e=this,n={key:this.key,id:t.id,status:t.status};Object(i["y"])(n).then((function(t){200===t.status?e.$message.success("修改成功！"):e.$message.error(t.message)}))},del:function(t){var e=this;this.$confirm("是否删除该商品标签?","提示",{confirmButtonText:"是",cancelButtonText:"否",type:"warning"}).then((function(){var n={id:t,key:e.key};Object(i["d"])(n).then((function(t){200===t.status?(e.$message.success("删除成功！"),e.getGoodsLabel({key:e.key})):e.$message.error(t.message)}))})).catch((function(){}))}}},h=f,p=(n("8f60f"),Object(d["a"])(h,r,a,!1,null,"2c35ded8",null));e["default"]=p.exports},"8f60f":function(t,e,n){"use strict";var r=n("6e36"),a=n.n(r);a.a},c40e:function(t,e,n){"use strict";n.d(e,"f",(function(){return a})),n.d(e,"p",(function(){return o})),n.d(e,"v",(function(){return u})),n.d(e,"x",(function(){return i})),n.d(e,"b",(function(){return c})),n.d(e,"h",(function(){return s})),n.d(e,"g",(function(){return d})),n.d(e,"q",(function(){return l})),n.d(e,"w",(function(){return m})),n.d(e,"c",(function(){return f})),n.d(e,"j",(function(){return h})),n.d(e,"k",(function(){return p})),n.d(e,"e",(function(){return b})),n.d(e,"l",(function(){return g})),n.d(e,"u",(function(){return v})),n.d(e,"t",(function(){return w})),n.d(e,"a",(function(){return O})),n.d(e,"z",(function(){return j})),n.d(e,"m",(function(){return y})),n.d(e,"i",(function(){return k})),n.d(e,"r",(function(){return G})),n.d(e,"y",(function(){return $})),n.d(e,"d",(function(){return _})),n.d(e,"n",(function(){return D})),n.d(e,"C",(function(){return A})),n.d(e,"s",(function(){return x})),n.d(e,"o",(function(){return C})),n.d(e,"A",(function(){return S})),n.d(e,"B",(function(){return T}));var r=n("b775");function a(t){return Object(r["a"])({url:"/merchantCategory",method:"get",params:t})}function o(t){return Object(r["a"])({url:"/merchantCategory",method:"POST",data:t})}function u(t){return Object(r["a"])({url:"/merchantCategory/"+t.id,method:"PUT",data:t})}function i(t){return Object(r["a"])({url:"/merchantCategoryStatus/"+t.id,method:"PUT",data:t})}function c(t){return Object(r["a"])({url:"/merchantCategory/"+t.id,method:"DELETE",data:t})}function s(t){return Object(r["a"])({url:"/merchantCategoryParent",method:"get",params:t})}function d(t){return Object(r["a"])({url:"/merchantGrouping",method:"get",params:t})}function l(t){return Object(r["a"])({url:"/merchantGrouping",method:"POST",data:t})}function m(t){return Object(r["a"])({url:"/merchantGrouping/"+t.id,method:"PUT",data:t})}function f(t){return Object(r["a"])({url:"/merchantGrouping/"+t.id,method:"DELETE",data:t})}function h(t){return Object(r["a"])({url:"/merchantGoods",method:"get",params:t})}function p(t){return Object(r["a"])({url:"/merchantGoodsName",method:"get",params:t})}function b(t){var e=t.id;return delete t.id,Object(r["a"])({url:"/merchantGoods/"+e,method:"get",params:t})}function g(t){var e=t.id;return delete t.id,Object(r["a"])({url:"/merchantGoodsQCode/"+e,method:"get",params:t})}function v(t){var e=t.id;return delete t.id,Object(r["a"])({url:"/merchantIsUpdate/"+e,method:"get",params:t})}function w(t){var e=t.id;return delete t.id,Object(r["a"])({url:"/merchantGoods/"+e,method:"put",data:t})}function O(t){var e=t.id;return delete t.id,Object(r["a"])({url:"/merchantGoods/"+e,method:"delete",data:t})}function j(t){var e=t.id;return delete t.id,Object(r["a"])({url:"/merchantGood/"+e,method:"put",data:t})}function y(t){return Object(r["a"])({url:"/merchantCategoryTypeSub",method:"get",params:t})}function k(t){return Object(r["a"])({url:"/merchantGoodsLabel",method:"get",params:t})}function G(t){return Object(r["a"])({url:"/merchantGoodsLabel",method:"POST",data:t})}function $(t){return Object(r["a"])({url:"/merchantGoodsLabel/"+t.id,method:"PUT",data:t})}function _(t){return Object(r["a"])({url:"/merchantGoodsLabel/"+t.id,method:"DELETE",data:t})}function D(t){return Object(r["a"])({url:"/merchantGoodsRecycle",method:"get",params:t})}function A(t){var e=t.id;return delete t.id,Object(r["a"])({url:"/merchantGoodReduction/"+e,method:"PUT",data:t})}function x(t){return Object(r["a"])({url:"/merchantRedisMessage",method:"post",data:t})}function C(t){var e=t.id;return delete t.id,Object(r["a"])({url:"/merchantStock/"+e,method:"get",params:t})}function S(t){var e=t.id;return delete t.id,Object(r["a"])({url:"/merchantStock/"+e,method:"put",data:t})}function T(t){var e=t.id;return delete t.id,Object(r["a"])({url:"/merchantStockPrice/"+e,method:"put",data:t})}}}]);