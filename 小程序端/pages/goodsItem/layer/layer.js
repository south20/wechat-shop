(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goodsItem/layer/layer"],{"0257":function(t,e,a){"use strict";var r=a("4be7"),n=a.n(r);n.a},"23df":function(t,e,a){"use strict";var r,n=function(){var t=this,e=t.$createElement;t._self._c},i=[];a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return r}))},"4be7":function(t,e,a){},"7a25":function(t,e,a){"use strict";a.r(e);var r=a("23df"),n=a("e3bd");for(var i in n)"default"!==i&&function(t){a.d(e,t,(function(){return n[t]}))}(i);a("0257");var o,s=a("f0c5"),p=Object(s["a"])(n["default"],r["b"],r["c"],!1,null,"6d33f427",null,!1,r["a"],o);e["default"]=p.exports},e113:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(a("4795")),n=a("1be5");function i(t){return t&&t.__esModule?t:{default:t}}function o(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function s(t,e,a,r,n,i,o){try{var s=t[i](o),p=s.value}catch(c){return void a(c)}s.done?e(p):Promise.resolve(p).then(r,n)}function p(t){return function(){var e=this,a=arguments;return new Promise((function(r,n){var i=t.apply(e,a);function o(t){s(i,r,n,o,p,"next",t)}function p(t){s(i,r,n,o,p,"throw",t)}o(void 0)}))}}var c={data:function(){return{property1:{},property2:{},pic_url:"",fpic_url:"",price:"",stock:"",sales:"",num:1,goods_name:"",background:t.getStorageSync("background"),is_open:!1,start_advance_time:"",end_advance_time:"",advacneFlag:!1,weight:0,propertydetail:""}},components:{},props:{show:{type:Boolean,default:!1,observe:function(t){}},goodsid:{type:String},btnStatus:{type:String},tuanNum:{type:Number,default:0},submit_type:{type:Number,default:0},group_id:{type:Number,default:0},type:{type:String},service_goods_is_ship:{type:String},supplier_id:{type:Number},supplier_name:{type:String},start_time:{type:String},data:{type:Object},interFlag:{type:Boolean}},watch:{tuanNum:{handler:function(t){this.getData()}},data:{handler:function(t){t.hasOwnProperty("property1")&&this.getData(t),t.hasOwnProperty("advance_info")&&this.setData({start_advance_time:(0,n.formatTime)(1e3*t.advance_info.pay_start_time,"yyyy.MM.dd.hh.mm.ss"),end_advance_time:(0,n.formatTime)(1e3*t.advance_info.pay_end_time,"yyyy.MM.dd.hh.mm.ss")})},immediate:!0,deep:!0},interFlag:{handler:function(t){t&&this.setData({advacneFlag:!1})},immediate:!0}},beforeMount:function(){this.setData({is_open:t.getStorageSync("Config").is_stock})},mounted:function(){},methods:{preview:function(){console.log(this.fpic_url,this.pic_url),t.previewImage({urls:[this.fpic_url],current:this.fpic_url})},postSM:function(){var e=this,a=[];1==this.data.is_group&&(a.push(t.getStorageSync("SubscribeTemplateId")["assemble"]),a.push(t.getStorageSync("SubscribeTemplateId")["merchandise_arrival"])),1==this.data.is_advance_sale&&(a.push(t.getStorageSync("SubscribeTemplateId")["presale"]),a.push(t.getStorageSync("SubscribeTemplateId")["merchandise_arrival"])),t.getStorageSync("SubscribeTemplateId")["check"]?wx.requestSubscribeMessage({tmplIds:a,success:function(t){e.postSubscribeMessage(t),e.buyGoods()},fail:function(t){e.buyGoods()}}):this.buyGoods()},buyGoods:function(e){var a=this;return p(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(0!=a.sales){e.next=3;break}return wx.showToast({title:"该商品已售罄,请联系卖家补货",icon:"none"}),e.abrupt("return",!1);case 3:if(!(0!=a.start_time&&1e3*a.start_time>(new Date).getTime())){e.next=6;break}return wx.showToast({title:"活动未开始",icon:"none"}),e.abrupt("return",!1);case 6:return e.next=8,a.getTuanConfig();case 8:if(!e.sent){e.next=11;break}return wx.showToast({title:"现在是休市时间,无法购买, 请将商品加入购物车",icon:"none"}),e.abrupt("return",!1);case 11:a.http({url:"shopUserInfo"}).then((function(e){var r=[{supplier_id:a.supplier_id,supplier_name:0==a.supplier_id?t.getStorageSync("shopInfo").name:a.supplier_name,list:[{goods_id:a.goodsid,goods_name:a.goods_name,price:0==a.data.is_advance_sale?a.price:a.data.advance_info.front_money,number:a.num,weight:a.weight,total_price:a.price*a.num,property1_name:a.property1.data[a.property1.flag],property2_name:a.property2.data[a.property2.flag],pic_url:a.pic_url,stock_id:a.stock,service_goods_is_ship:a.service_goods_is_ship,type:a.type}]}];0==a.data.is_advance_sale?(wx.navigateTo({url:"/pages/createOrder/createOrder/createOrder?group_id=".concat(a.group_id)}),wx.setStorageSync("advance_sale",0)):(a.setData({advacneFlag:!0}),wx.setStorageSync("advance_sale",1)),wx.setStorageSync("shopcartData",r),wx.setStorageSync("tuanNum",a.tuanNum)})).catch((function(t){wx.navigateTo({url:"/pages/login2/login2"})}));case 12:case"end":return e.stop()}}),e)})))()},addShopCart:function(t){var e=this;if(0==this.sales)return wx.showToast({title:"该商品已售罄,请联系卖家补货",icon:"none"}),!1;var a={goods_id:this.goodsid,price:this.price,number:this.num,total_price:this.price*this.num,property1_name:this.property1.data[this.property1.flag],property2_name:this.property2.data[this.property2.flag],pic_url:this.pic_url,stock_id:this.stock};this.http({url:"shopCart",method:"post",data:a}).then((function(t){wx.showToast({title:"添加购物车完毕",icon:"none"}),e.setData({show:!1})}))},subtract:function(){this.setData({num:1==this.num?this.num:this.num-1})},add:function(){this.setData({num:this.num==this.sales?this.num:this.num+1})},closeLayer:function(){this.$emit("colseLayer")},getData:function(){var e={data:this.data},a={},r={};try{a={key:e.data.property1.split(":")[0],data:e.data.property1.split(":")[1].split(","),flag:0},r={key:e.data.property2.split(":")[0],data:e.data.property2.split(":")[1].split(","),flag:0}}catch(n){console.log(e.data),a={key:e.data.property1.split(":")[0],data:e.data.property1.split(":")[1].split(","),flag:0}}this.setData({property1:a,property2:r,price:e.data.price,goods_name:e.data.name,fpic_url:e.data.pic_urls[0],background:t.getStorageSync("background")}),this.getProperty2(this.property1.data[this.property1.flag])},getProperty2:function(e){var a=this,r="",n="";try{r=e.currentTarget.dataset.name,n=e.currentTarget.dataset.index}catch(i){r=e,n=0}this.http({url:"shopGoodsStockProperty/".concat(this.goodsid),data:{property1_name:r,key:t.getStorageSync("shopkey")}}).then((function(t){var e,r=[];t.data.map((function(t){r.push(t.property2_name)})),a.setData((e={},o(e,"property2.data",r),o(e,"property2.flag",0),o(e,"property1.flag",n),e)),a.merchantGoodsStock()}))},merchantGoodsStock:function(e){var a=this,r="",n="",i={};wx.setStorageSync("leader_discount",0),i=0!=this.tuanNum?{property1_name:this.property1.data[this.property1.flag],property2_name:r,key:t.getStorageSync("shopkey"),number:this.tuanNum,submit_type:this.submit_type}:{property1_name:this.property1.data[this.property1.flag],property2_name:r,key:t.getStorageSync("shopkey")};try{i.property2_name=e.currentTarget.dataset.name||"",n=e.currentTarget.dataset.index}catch(s){i.property2_name=this.property2.data[this.property2.flag]||"",n=0}this.http({url:"shopGoodsStock/".concat(this.goodsid),data:i}).then((function(t){var e;a.setData((e={pic_url:t.data.pic_url,price:0==a.tuanNum?t.data.price:t.data.group_price,stock:t.data.id,sales:t.data.number,weight:t.data.weight},o(e,"property2.flag",n),o(e,"propertydetail",t.data),e)),0==a.group_id&&0!=a.tuanNum&&wx.setStorageSync("leader_discount",parseInt(100*(t.data.group_price-t.data.leader_price))/100)}))},click:function(){return!1},go:function(){wx.navigateTo({url:"/pages/createOrder/createOrder/createOrder?group_id=".concat(this.group_id)})},changeadvacneFlag:function(){this.setData({advacneFlag:!this.advacneFlag})},getTuanConfig:function(){var e=this;return new Promise((function(a){e.http({url:"shopTuanConfig",data:{key:t.getStorageSync("shopkey")}}).then((function(t){a(!t.data.is_bool)}))}))},postBargainSubscribeMessage:function(){var e=this,a=[];a.push(t.getStorageSync("SubscribeTemplateId")["bargain"]),a.push(t.getStorageSync("SubscribeTemplateId")["merchandise_arrival"]),t.getStorageSync("SubscribeTemplateId")["check"]?wx.requestSubscribeMessage({tmplIds:a,success:function(t){e.postSubscribeMessage(t),e.toBargaining()},fail:function(t){e.toBargaining()}}):this.toBargaining()},toBargaining:function(){this.http({url:"shopBargain",method:"post",data:{name:this.propertydetail.name,goods_id:this.data.id,stock_id:this.propertydetail.id}}).then((function(t){wx.navigateTo({url:"/bargaining/pages/buyDetail/buyDetail?id=".concat(t.data)})}))}}};e.default=c}).call(this,a("543d")["default"])},e3bd:function(t,e,a){"use strict";a.r(e);var r=a("e113"),n=a.n(r);for(var i in r)"default"!==i&&function(t){a.d(e,t,(function(){return r[t]}))}(i);e["default"]=n.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/goodsItem/layer/layer-create-component',
    {
        'pages/goodsItem/layer/layer-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7a25"))
        })
    },
    [['pages/goodsItem/layer/layer-create-component']]
]);
