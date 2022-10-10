"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "homeworkBox",
  props: {
    homework: Object
  },
  data() {
    return {
      authorInfo: {
        headImg: "",
        nickName: ""
      },
      homeworkState: 0
    };
  },
  created() {
    this.getAuthorInfo();
  },
  methods: {
    async getAuthorInfo() {
      const db = common_vendor.pn.database();
      const { result: res } = await db.collection("users").where({ account: this.$props.homework.author }).get();
      this.authorInfo = res.data[0];
      const tokenInfo = common_vendor.index.getStorageSync("userAccount");
      if (this.$props.homework.completeUsers.indexOf(tokenInfo) !== -1) {
        this.homeworkState = 1;
      } else {
        const deadLine = +new Date(this.$props.homework.deadLine);
        const nowTime = +new Date();
        if (nowTime - deadLine > 0) {
          this.homeworkState = 2;
        }
      }
    },
    goDetails() {
      const homeworkId = this.$props.homework._id;
      common_vendor.index.navigateTo({
        url: "/pages/homeworkDetails/homeworkDetails?id=" + homeworkId,
        animationType: "slide-in-right",
        animationDuration: 100
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.homework.title),
    b: common_vendor.t($props.homework.deadLine),
    c: $data.authorInfo.headImg,
    d: common_vendor.t($data.authorInfo.nickName),
    e: common_vendor.t($props.homework.time),
    f: $data.homeworkState === 0
  }, $data.homeworkState === 0 ? {} : $data.homeworkState === 1 ? {} : {}, {
    g: $data.homeworkState === 1,
    h: common_vendor.o((...args) => $options.goDetails && $options.goDetails(...args))
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/1study/case/Love316/love316/components/homeworkBox/homeworkBox.vue"]]);
wx.createComponent(Component);
