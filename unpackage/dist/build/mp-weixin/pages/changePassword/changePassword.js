"use strict";var s=require("../../common/vendor.js");const e={data:()=>({ifChange:!1,oldPassword:"",newPassword:"",newPasswordNext:"",passwordErr:!1}),methods:{async changePassword(){if(this.ifChange=!0,""===this.oldPassword||""===this.newPassword||""===this.newPasswordNext)s.index.showToast({title:"请完整填写表单",icon:"error",duration:2e3}),this.ifChange=!1;else{const e=s.index.getStorageSync("userAccount"),r=s.pn.database(),{result:a}=await r.collection("users").where({account:e}).get();a.data[0].password===this.oldPassword?!1===this.passwordErr?(await r.collection("users").update({password:this.newPasswordNext}),s.index.showModal({title:"成功",content:"修改密码成功",showCancel:!1,success(){s.index.removeStorageSync("userAccount"),s.index.reLaunch({url:"/pages/login/login"})}})):(s.index.showToast({title:"新密码不一致",icon:"error",duration:2e3}),this.ifChange=!1):(s.index.showToast({title:"旧密码错误",icon:"error",duration:2e3}),this.ifChange=!1)}}},watch:{newPasswordNext(s,e){s!==this.newPassword?this.passwordErr=!0:this.passwordErr=!1}}};var r=s._export_sfc(e,[["render",function(e,r,a,o,t,n){return s.e({a:t.oldPassword,b:s.o(s.m((s=>t.oldPassword=s.detail.value),{trim:!0})),c:t.newPassword,d:s.o(s.m((s=>t.newPassword=s.detail.value),{trim:!0})),e:t.newPasswordNext,f:s.o(s.m((s=>t.newPasswordNext=s.detail.value),{trim:!0})),g:t.passwordErr},(t.passwordErr,{}),{h:t.ifChange},t.ifChange?{}:{i:s.o(((...s)=>n.changePassword&&n.changePassword(...s)))})}]]);wx.createPage(r);