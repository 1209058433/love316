"use strict";var e=require("../../common/vendor.js");const i={props:{ifLogin:Boolean},data:()=>({newCurriculumUrl:[],newClassTimeUrl:[],curriculumUrl:"",classTimeUrl:"",ifChangeCurriculum:!1,ifChangeClassTime:!1}),created(){this.getBaseData()},methods:{async getBaseData(){const i=e.pn.database(),{result:l}=await i.collection("schoolWeek").where({id:1}).get();this.curriculumUrl=l.data[0].curriculumUrl,this.classTimeUrl=l.data[0].classTimeUrl},watchcurriculumUrl(){e.index.previewImage({urls:[this.curriculumUrl]})},watchClassTimeImg(){e.index.previewImage({urls:[this.classTimeUrl]})},uploadingImg(){e.index.showLoading({title:"加载中"})},async uploadSuccess(){e.index.hideLoading();e.pn.importObject("delClassImg").delImg(this.curriculumUrl);const i=e.pn.database();await i.collection("schoolWeek").where({id:1}).update({curriculumUrl:this.newCurriculumUrl[0].url}),e.index.showToast({icon:"success",title:"上传成功",duration:2e3}),e.index.redirectTo({url:"/pages/index/index"})},async uploadSuccessTime(){e.pn.importObject("delClassImg").delImg(this.classTimeUrl);const i=e.pn.database();await i.collection("schoolWeek").where({id:1}).update({classTimeUrl:this.newClassTimeUrl[0].url}),e.index.hideLoading(),e.index.showToast({icon:"success",title:"上传成功",duration:2e3}),e.index.redirectTo({url:"/pages/index/index"})},uploadFail(){e.index.hideLoading(),e.index.showToast({icon:"error",title:"上传失败",duration:2e3})},upLoadCurriculum(){this.ifChangeCurriculum=!this.ifChangeCurriculum},uploadClassTime(){this.ifChangeClassTime=!this.ifChangeClassTime}}};if(!Array){e.resolveComponent("uni-file-picker")()}Math;var l=e._export_sfc(i,[["render",function(i,l,a,r,s,u){return e.e({a:e.o(((...e)=>u.upLoadCurriculum&&u.upLoadCurriculum(...e))),b:a.ifLogin,c:e.o(((...e)=>u.watchcurriculumUrl&&u.watchcurriculumUrl(...e))),d:s.ifChangeCurriculum},s.ifChangeCurriculum?{e:e.o(u.uploadingImg),f:e.o(u.uploadSuccess),g:e.o(u.uploadFail),h:e.o((e=>s.newCurriculumUrl=e)),i:e.p({limit:"1",title:"最多选择1张图片,仅支持png/jpg","file-mediatype":"image","file-extname":"png,jpg",modelValue:s.newCurriculumUrl})}:{},{j:e.o(((...e)=>u.uploadClassTime&&u.uploadClassTime(...e))),k:a.ifLogin,l:e.o(((...e)=>u.watchClassTimeImg&&u.watchClassTimeImg(...e))),m:s.ifChangeClassTime},s.ifChangeClassTime?{n:e.o(u.uploadingImg),o:e.o(u.uploadSuccessTime),p:e.o(u.uploadFail),q:e.o((e=>s.newClassTimeUrl=e)),r:e.p({limit:"1",title:"最多选择1张图片,仅支持png/jpg","file-mediatype":"image","file-extname":"png,jpg",modelValue:s.newClassTimeUrl})}:{})}]]);wx.createComponent(l);