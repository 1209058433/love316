"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      ifUploading: false,
      newNickname: ""
    };
  },
  methods: {
    async changeNickname() {
      this.ifUploading = true;
      const tokenInfo = common_vendor.index.getStorageSync("userAccount");
      const db = common_vendor.pn.database();
      await db.collection("users").where({ account: tokenInfo }).update({ nickName: this.newNickname });
      common_vendor.index.showToast({
        title: "\u66F4\u65B0\u6210\u529F",
        duration: 2e3
      });
      common_vendor.index.reLaunch({
        url: "/pages/myself/myself"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.newNickname,
    b: common_vendor.o(($event) => $data.newNickname = $event.detail.value),
    c: common_vendor.p({
      title: "\u65B0\u6635\u79F0",
      type: "line"
    }),
    d: $data.ifUploading
  }, $data.ifUploading ? {} : {
    e: common_vendor.o((...args) => $options.changeNickname && $options.changeNickname(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/1study/case/Love316/love316/pages/changeNickname/changeNickname.vue"]]);
wx.createPage(MiniProgramPage);
