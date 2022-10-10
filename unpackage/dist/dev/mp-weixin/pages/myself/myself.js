"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userHeadImg: "",
      userNickName: "\u8D85\u7EA7\u65E0\u654C\u738B\u5B50\u521A"
    };
  },
  created() {
    this.ifLog();
  },
  methods: {
    async ifLog() {
      const userToken = common_vendor.index.getStorageSync("userAccount");
      if (!userToken) {
        common_vendor.index.redirectTo({
          url: "/pages/login/login"
        });
      } else {
        const db = common_vendor.pn.database();
        const { result: res } = await db.collection("users").where({ account: userToken }).get();
        const userInfo = res.data[0];
        this.userHeadImg = userInfo.headImg;
        this.userNickName = userInfo.nickName;
      }
    },
    exitLog() {
      common_vendor.index.showModal({
        title: "\u9000\u51FA\u767B\u5F55",
        content: "\u786E\u5B9A\u8981\u9000\u51FA\u767B\u5F55\u5417",
        success(res) {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("userAccount");
            common_vendor.index.reLaunch({
              url: "/pages/index/index"
            });
          }
        }
      });
    },
    changeHead() {
      common_vendor.index.navigateTo({
        url: "/pages/changeHead/changeHead",
        animationType: "slide-in-right",
        animationDuration: 100
      });
    },
    changeNickname() {
      common_vendor.index.navigateTo({
        url: "/pages/changeNickname/changeNickname",
        animationType: "slide-in-right",
        animationDuration: 100
      });
    },
    changePassword() {
      common_vendor.index.navigateTo({
        url: "/pages/changePassword/changePassword",
        animationType: "slide-in-right",
        animationDuration: 100
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.userHeadImg,
    b: common_vendor.t($data.userNickName),
    c: common_vendor.o((...args) => $options.changeHead && $options.changeHead(...args)),
    d: common_vendor.o((...args) => $options.changeNickname && $options.changeNickname(...args)),
    e: common_vendor.o((...args) => $options.changePassword && $options.changePassword(...args)),
    f: common_vendor.o((...args) => $options.exitLog && $options.exitLog(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/1study/case/Love316/love316/pages/myself/myself.vue"]]);
wx.createPage(MiniProgramPage);
