"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      homeworkList: [],
      fresh: 0
    };
  },
  created() {
    this.getHomeworkList();
  },
  onPullDownRefresh() {
    const thisPage = getCurrentPages();
    const thisPagePath = thisPage[0].$page.fullPath;
    common_vendor.index.redirectTo({
      url: "/pages/none/none?path=" + thisPagePath
    });
    common_vendor.index.stopPullDownRefresh();
  },
  methods: {
    goWrite() {
      const tokenInfo = common_vendor.index.getStorageSync("userAccount");
      if (tokenInfo) {
        common_vendor.index.navigateTo({
          url: "/pages/writehomework/writehomework",
          animationType: "slide-in-right",
          animationDuration: 100
        });
      } else {
        common_vendor.index.showToast({
          title: "\u672A\u767B\u5F55",
          icon: "error",
          duration: 2e3
        });
      }
    },
    async getHomeworkList() {
      const db = common_vendor.pn.database();
      const {
        result: res
      } = await db.collection("homework").get();
      this.homeworkList = res.data.reverse();
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_homeworkBox2 = common_vendor.resolveComponent("homeworkBox");
  (_easycom_uni_section2 + _easycom_homeworkBox2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_homeworkBox = () => "../../components/homeworkBox/homeworkBox.js";
if (!Math) {
  (_easycom_uni_section + _easycom_homeworkBox)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goWrite && $options.goWrite(...args)),
    b: common_vendor.p({
      title: "\u4F5C\u4E1A\u5217\u8868",
      type: "line"
    }),
    c: common_vendor.f($data.homeworkList, (item, k0, i0) => {
      return {
        a: item._id,
        b: "08418e3f-1-" + i0,
        c: common_vendor.p({
          homework: item
        })
      };
    }),
    d: $data.fresh
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/1study/case/Love316/love316/pages/homework/homework.vue"]]);
wx.createPage(MiniProgramPage);
