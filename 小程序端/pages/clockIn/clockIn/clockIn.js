(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/clockIn/clockIn/clockIn"],{"2bd6":function(t,e,n){"use strict";var a=n("e52d"),i=n.n(a);i.a},"36c7":function(t,e,n){"use strict";n.r(e);var a=n("fedc"),i=n("9848");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("2bd6");var r,c=n("f0c5"),s=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,"4cd9562e",null,!1,a["a"],r);e["default"]=s.exports},5598:function(t,e,n){"use strict";(function(t){function a(t){if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=i(t))){var e=0,n=function(){};return{s:n,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o,r=!0,c=!1;return{s:function(){a=t[Symbol.iterator]()},n:function(){var t=a.next();return r=t.done,t},e:function(t){c=!0,o=t},f:function(){try{r||null==a.return||a.return()}finally{if(c)throw o}}}}function i(t,e){if(t){if("string"===typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;getApp();var r=function(){n.e("pages/footer/footer").then(function(){return resolve(n("2175"))}.bind(null,n)).catch(n.oe)},c={data:function(){return{active:0,current:1,page:!1,createdTime:"",continuousTime:"",activityName:"",activityImg:"",activityRemark:"",activityId:"",avatar:[],cumulative:0,remarkFlag:!1,list:[],chooseday:(new Date).getUTCDate(),chooseIndex:"",year:"",month:"",leiji:"",lianxu:"",isSign:!1,rankingList:[],today:(new Date).getUTCDate(),createTime:""}},components:{diyfooter:r},props:{},onShow:function(){console.log("aaaaa",this.options),this.options.id&&console.log("aaaa"),wx.setNavigationBarTitle({title:"签到"})},onLoad:function(t){decodeURIComponent(t.scene);this.getData()},methods:{tab_btn:function(t){this.setData({active:t.currentTarget.dataset.index})},screen_btn:function(t){var e=t.currentTarget.dataset.index;this.setData({current:t.currentTarget.dataset.index}),console.log(e),this.shopSignsTotal(e)},goClockIng:function(t){var e=this;this.http({url:"shopSign",method:"post",data:{sign_id:this.activityId}}).then((function(){wx.showToast({title:"签到成功"}),e.getDateList(),e.getLeiji(),e.getSignToDay(),e.shopSignsTotal(1)}))},index:function(){wx.redirectTo({url:"/pages/index/index/index"})},getData:function(){var e=this;this.http({url:"shopSignIn",data:{key:t.getStorageSync("shopkey")}}).then((function(t){var n=t.data[0].start_time,a=1*t.data[0].end_time.split("-")[2]-1*n.split("-")[2],i=t.data[0].name,o=t.data[0].pic_url_activity,r=t.data[0].remark,c=t.data[0].id,s=t.avatar,u=t.number;e.setData({createTime:n,continuousTime:a,activityName:i,activityImg:o,activityRemark:r,activityId:c,avatar:s,cumulative:u}),e.getDateList(),e.getLeiji(),e.getSignToDay(),e.shopSignsTotal(1)})).catch((function(t){204===t.status&&(wx.showToast({title:"活动暂未开启",icon:"none"}),setTimeout((function(){wx.navigateBack({})}),1e3))}))},show:function(t){console.log(t),this.setData({page:!0})},remarkShow:function(){this.setData({remarkFlag:!this.remarkFlag})},getDateList:function(){for(var t=this,e=new Date((new Date).getFullYear(),(new Date).getMonth()+1,0).getDate(),n=new Date((new Date).getFullYear(),(new Date).getMonth()+1,1-e).getDay(),i=[],o=0;o<n;o++){var r={};i.push(r)}console.log(i),this.http({url:"shopSign/".concat(this.activityId)}).then((function(n){console.log("请求成功");var o,r={},c=a(n.data);try{for(c.s();!(o=c.n()).done;){var s=o.value;r[s.create_time.split(" ")[0].split("-")[2]]={pic_url:s.pic_url}}}catch(h){c.e(h)}finally{c.f()}console.log(r,n);for(var u=0;u<e;u++){var l=String(u+1).padStart(2,0);console.log(l);var d={day:u+1,status:!!r[l],pic_url:r[u+1]?r[u+1].pic_url:""};i.push(d)}t.setData({list:i,chooseIndex:t.chooseday+new Date((new Date).getFullYear(),(new Date).getMonth()+1,1-e).getDay()-1,year:(new Date).getFullYear(),month:(new Date).getMonth()+1})})).catch((function(n){if(204==n.status){for(var a=0;a<e;a++){var o={day:a+1,status:!1,pic_url:""};i.push(o)}t.setData({list:i,chooseIndex:t.chooseday+new Date((new Date).getFullYear(),(new Date).getMonth()+1,1-e).getDay()-1,year:(new Date).getFullYear(),month:(new Date).getMonth()+1})}}))},getLeiji:function(){var t=this;this.http({url:"shopSigns/".concat(this.activityId)}).then((function(e){t.setData({lianxu:e.data.lianxu,leiji:e.data.leiji})}))},changeChoose:function(t){var e,n;try{e=t.currentTarget.dataset.index,n=t.currentTarget.dataset.day}catch(a){console.log("报错",t.index,t.day,t),e=t.index,n=t.day}this.setData({chooseIndex:e,chooseday:n})},getSignToDay:function(){var t=this,e=!1;this.http({url:"shopSignToDay/".concat(this.activityId)}).then((function(n){console.log("查询今天是否签到",n.data),e=!0,t.setData({isSign:e})})).catch((function(n){t.setData({isSign:e})}))},retroactive:function(){var t=this,e={index:this.chooseIndex,day:this.chooseday},n="".concat((new Date).getFullYear(),"-").concat((new Date).getUTCMonth()+1,"-").concat(this.chooseday);this.http({url:"shopSignsRepair/".concat(this.activityId),method:"post",data:{time:n}}).then((function(n){var a=n.data;wx.requestPayment({timeStamp:a.timeStamp,nonceStr:a.nonceStr,package:a.package,signType:a.signType,paySign:a.paySign,success:function(n){console.log(n),wx.showToast({title:"补签成功",icon:"none"}),t.getDateList(),t.changeChoose(e)}})}))},shopSignsTotal:function(t){var e=this;wx.showLoading({title:""}),this.http({url:"shopSignsTotal/".concat(this.activityId)}).then((function(n){var a=[];for(var i in wx.hideLoading(),n.data)console.log(i),a.push(i);e.setData({rankingList:n.data[a[t]]})}))}}};e.default=c}).call(this,n("543d")["default"])},9848:function(t,e,n){"use strict";n.r(e);var a=n("5598"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},c183:function(t,e,n){"use strict";(function(t){n("cd90");a(n("66fd"));var e=a(n("36c7"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},e52d:function(t,e,n){},fedc:function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}))}},[["c183","common/runtime","common/vendor"]]]);