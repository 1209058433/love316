"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    ifLogin: Boolean
  },
  data() {
    return {
      newCurriculumUrl: [],
      newClassTimeUrl: [],
      curriculumUrl: "",
      classTimeUrl: "",
      ifChangeCurriculum: false,
      ifChangeClassTime: false
    };
  },
  created() {
    this.getBaseData();
  },
  methods: {
    async getBaseData() {
      const db = common_vendor.pn.database();
      const {
        result: res
      } = await db.collection("schoolWeek").where({
        id: 1
      }).get();
      this.curriculumUrl = res.data[0].curriculumUrl;
      this.classTimeUrl = res.data[0].classTimeUrl;
    },
    watchcurriculumUrl() {
      common_vendor.index.previewImage({
        urls: [this.curriculumUrl]
      });
    },
    watchClassTimeImg() {
      common_vendor.index.previewImage({
        urls: [this.classTimeUrl]
      });
    },
    uploadingImg() {
      common_vendor.index.showLoading({
        title: "\u52A0\u8F7D\u4E2D"
      });
    },
    async uploadSuccess() {
      common_vendor.index.hideLoading();
      const delClassImg = common_vendor.pn.importObject("delClassImg");
      delClassImg.delImg(this.curriculumUrl);
      const db = common_vendor.pn.database();
      await db.collection("schoolWeek").where({
        id: 1
      }).update({
        curriculumUrl: this.newCurriculumUrl[0].url
      });
      common_vendor.index.showToast({
        icon: "success",
        title: "\u4E0A\u4F20\u6210\u529F",
        duration: 2e3
      });
      common_vendor.index.redirectTo({
        url: "/pages/index/index"
      });
    },
    async uploadSuccessTime() {
      const delClassImg = common_vendor.pn.importObject("delClassImg");
      delClassImg.delImg(this.classTimeUrl);
      const db = common_vendor.pn.database();
      await db.collection("schoolWeek").where({
        id: 1
      }).update({
        classTimeUrl: this.newClassTimeUrl[0].url
      });
      common_vendor.index.hideLoading();
      common_vendor.index.showToast({
        icon: "success",
        title: "\u4E0A\u4F20\u6210\u529F",
        duration: 2e3
      });
      common_vendor.index.redirectTo({
        url: "/pages/index/index"
      });
    },
    uploadFail() {
      common_vendor.index.hideLoading();
      common_vendor.index.showToast({
        icon: "error",
        title: "\u4E0A\u4F20\u5931\u8D25",
        duration: 2e3
      });
    },
    upLoadCurriculum() {
      this.ifChangeCurriculum = !this.ifChangeCurriculum;
    },
    uploadClassTime() {
      this.ifChangeClassTime = !this.ifChangeClassTime;
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
    a: common_vendor.o((...args) => $options.upLoadCurriculum && $options.upLoadCurriculum(...args)),
    b: $props.ifLogin,
    c: common_vendor.o((...args) => $options.watchcurriculumUrl && $options.watchcurriculumUrl(...args)),
    d: $data.ifChangeCurriculum
  }, $data.ifChangeCurriculum ? {
    e: common_vendor.o($options.uploadingImg),
    f: common_vendor.o($options.uploadSuccess),
    g: common_vendor.o($options.uploadFail),
    h: common_vendor.o(($event) => $data.newCurriculumUrl = $event),
    i: common_vendor.p({
      limit: "1",
      title: "\u6700\u591A\u9009\u62E91\u5F20\u56FE\u7247,\u4EC5\u652F\u6301png/jpg",
      ["file-mediatype"]: "image",
      ["file-extname"]: "png,jpg",
      modelValue: $data.newCurriculumUrl
    })
  } : {}, {
    j: common_vendor.o((...args) => $options.uploadClassTime && $options.uploadClassTime(...args)),
    k: $props.ifLogin,
    l: common_vendor.o((...args) => $options.watchClassTimeImg && $options.watchClassTimeImg(...args)),
    m: $data.ifChangeClassTime
  }, $data.ifChangeClassTime ? {
    n: common_vendor.o($options.uploadingImg),
    o: common_vendor.o($options.uploadSuccessTime),
    p: common_vendor.o($options.uploadFail),
    q: common_vendor.o(($event) => $data.newClassTimeUrl = $event),
    r: common_vendor.p({
      limit: "1",
      title: "\u6700\u591A\u9009\u62E91\u5F20\u56FE\u7247,\u4EC5\u652F\u6301png/jpg",
      ["file-mediatype"]: "image",
      ["file-extname"]: "png,jpg",
      modelValue: $data.newClassTimeUrl
    })
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/1study/case/Love316/love316/components/my-curriculum/my-curriculum.vue"]]);
wx.createComponent(Component);
