"use strict";var e=require("../../common/vendor.js");const a={data:()=>({imageValue:[],imageStyles:{width:120,height:120,border:{color:"#cfcfcf",width:2,style:"dashed",radius:"2px"}},ifUploading:!1}),methods:{upload(){this.ifUploading=!0,this.$refs.files.upload()},async uploadHeadImg(){const a=e.index.getStorageSync("userAccount"),i=e.pn.database(),{result:t}=await i.collection("users").where({account:a}).get(),l=t.data[0].headImg;e.pn.importObject("delClassImg").delImg(l),await i.collection("users").where({account:a}).update({headImg:this.imageValue[0].url}),this.ifUploading=!1,e.index.reLaunch({url:"/pages/myself/myself"})}}};if(!Array){e.resolveComponent("uni-file-picker")()}Math;var i=e._export_sfc(a,[["render",function(a,i,t,l,s,o){return e.e({a:e.sr("files","4c3e9302-0"),b:e.o(o.uploadHeadImg),c:e.o((e=>s.imageValue=e)),d:e.p({limit:"1",title:"最多选择1张图片",fileMediatype:"image","file-extname":"png,jpg","auto-upload":!1,"image-styles":s.imageStyles,"list-styles":a.listStyles,modelValue:s.imageValue}),e:s.ifUploading},s.ifUploading?{}:{f:e.o(((...e)=>o.upload&&o.upload(...e)))})}]]);wx.createPage(i);