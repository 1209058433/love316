"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      imageValue: [],
      imageStyles: {
        width: 120,
        height: 120,
        border: {
          color: "#cfcfcf",
          width: 2,
          style: "dashed",
          radius: "2px"
        }
      },
      ifUploading: false
    };
  },
  methods: {
    upload() {
      this.ifUploading = true;
      this.$refs.files.upload();
    },
    async uploadHeadImg() {
      const tokenInfo = common_vendor.index.getStorageSync("userAccount");
      const db = common_vendor.pn.database();
      const { result: res } = await db.collection("users").where({ account: tokenInfo }).get();
      const oldHeadUrl = res.data[0].headImg;
      const delClassImg = common_vendor.pn.importObject("delClassImg");
      delClassImg.delImg(oldHeadUrl);
      await db.collection("users").where({ account: tokenInfo }).update({
        headImg: this.imageValue[0].url
      });
      this.ifUploading = false;
      common_vendor.index.reLaunch({
        url: "/pages/myself/myself"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  _easycom_uni_file_picker2();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  _easycom_uni_file_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.sr("files", "4c3e9302-0"),
    b: common_vendor.o($options.uploadHeadImg),
    c: common_vendor.o(($event) => $data.imageValue = $event),
    d: common_vendor.p({
      limit: "1",
      title: "\u6700\u591A\u9009\u62E91\u5F20\u56FE\u7247",
      fileMediatype: "image",
      ["file-extname"]: "png,jpg",
      ["auto-upload"]: false,
      ["image-styles"]: $data.imageStyles,
      ["list-styles"]: _ctx.listStyles,
      modelValue: $data.imageValue
    }),
    e: $data.ifUploading
  }, $data.ifUploading ? {} : {
    f: common_vendor.o((...args) => $options.upload && $options.upload(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/1study/case/Love316/love316/pages/changeHead/changeHead.vue"]]);
wx.createPage(MiniProgramPage);
