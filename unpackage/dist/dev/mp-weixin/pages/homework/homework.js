"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "homework",
  setup(__props) {
    const rr = common_vendor.ref("123");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(rr.value)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/1study/case/Love316/love316/pages/homework/homework.vue"]]);
wx.createPage(MiniProgramPage);
