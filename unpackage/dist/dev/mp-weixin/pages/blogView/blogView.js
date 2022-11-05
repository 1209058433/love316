"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  onLoad(option) {
    this.url = "https://www.ibukisk.top/articlebrowse?id=" + option.id;
  },
  data() {
    return {
      url: ""
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.url
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/1study/case/Love316/love316/pages/blogView/blogView.vue"]]);
wx.createPage(MiniProgramPage);
