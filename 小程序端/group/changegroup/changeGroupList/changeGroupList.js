(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["group/changegroup/changeGroupList/changeGroupList"],{"371a":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={data:function(){return{avatar:t.getStorageSync("avatar"),leader_name:t.getStorageSync("leader_name")}},components:{},props:{data:{type:Array,default:function(){return[]}}},methods:{catchArea:function(t){console.log(t.currentTarget.dataset.area),wx.setStorageSync("area",t.currentTarget.dataset.area),wx.setStorageSync("area_id",t.currentTarget.dataset.area.uid),wx.navigateBack(),this.http({url:"shopTuanUserLeader/"+t.currentTarget.dataset.area.uid,method:"put"})}}};a.default=e}).call(this,e("543d")["default"])},6354:function(t,a,e){"use strict";var r=e("fb5c"),n=e.n(r);n.a},"6f4b":function(t,a,e){"use strict";e.r(a);var r=e("371a"),n=e.n(r);for(var u in r)"default"!==u&&function(t){e.d(a,t,(function(){return r[t]}))}(u);a["default"]=n.a},b4d7:function(t,a,e){"use strict";var r,n=function(){var t=this,a=t.$createElement;t._self._c},u=[];e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return u})),e.d(a,"a",(function(){return r}))},e351:function(t,a,e){"use strict";e.r(a);var r=e("b4d7"),n=e("6f4b");for(var u in n)"default"!==u&&function(t){e.d(a,t,(function(){return n[t]}))}(u);e("6354");var c,o=e("f0c5"),f=Object(o["a"])(n["default"],r["b"],r["c"],!1,null,"768b07b0",null,!1,r["a"],c);a["default"]=f.exports},fb5c:function(t,a,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'group/changegroup/changeGroupList/changeGroupList-create-component',
    {
        'group/changegroup/changeGroupList/changeGroupList-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e351"))
        })
    },
    [['group/changegroup/changeGroupList/changeGroupList-create-component']]
]);
