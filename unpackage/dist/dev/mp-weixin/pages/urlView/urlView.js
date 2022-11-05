"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      url: ""
    };
  },
  onLoad() {
    const url = common_vendor.index.getStorageSync("pageUrl");
    this.url = url;
  },
  onUnload() {
    common_vendor.index.removeStorageSync("pageUrl");
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.url
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/1study/case/Love316/love316/pages/urlView/urlView.vue"]]);
wx.createPage(MiniProgramPage);
