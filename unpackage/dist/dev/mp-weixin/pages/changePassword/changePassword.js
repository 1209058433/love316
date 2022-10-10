"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      ifChange: false,
      oldPassword: "",
      newPassword: "",
      newPasswordNext: "",
      passwordErr: false
    };
  },
  methods: {
    async changePassword() {
      this.ifChange = true;
      if (this.oldPassword === "" || this.newPassword === "" || this.newPasswordNext === "") {
        common_vendor.index.showToast({
          title: "\u8BF7\u5B8C\u6574\u586B\u5199\u8868\u5355",
          icon: "error",
          duration: 2e3
        });
        this.ifChange = false;
      } else {
        const tokenInfo = common_vendor.index.getStorageSync("userAccount");
        const db = common_vendor.pn.database();
        const { result: res } = await db.collection("users").where({ account: tokenInfo }).get();
        const oldPass = res.data[0];
        if (oldPass.password === this.oldPassword) {
          if (this.passwordErr === false) {
            await db.collection("users").update({ password: this.newPasswordNext });
            common_vendor.index.showModal({
              title: "\u6210\u529F",
              content: "\u4FEE\u6539\u5BC6\u7801\u6210\u529F",
              showCancel: false,
              success() {
                common_vendor.index.removeStorageSync("userAccount");
                common_vendor.index.reLaunch({
                  url: "/pages/login/login"
                });
              }
            });
          } else {
            common_vendor.index.showToast({
              title: "\u65B0\u5BC6\u7801\u4E0D\u4E00\u81F4",
              icon: "error",
              duration: 2e3
            });
            this.ifChange = false;
          }
        } else {
          common_vendor.index.showToast({
            title: "\u65E7\u5BC6\u7801\u9519\u8BEF",
            icon: "error",
            duration: 2e3
          });
          this.ifChange = false;
        }
      }
    }
  },
  watch: {
    newPasswordNext(newVal, oldVal) {
      if (newVal !== this.newPassword) {
        this.passwordErr = true;
      } else {
        this.passwordErr = false;
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.oldPassword,
    b: common_vendor.o(common_vendor.m(($event) => $data.oldPassword = $event.detail.value, {
      trim: true
    })),
    c: $data.newPassword,
    d: common_vendor.o(common_vendor.m(($event) => $data.newPassword = $event.detail.value, {
      trim: true
    })),
    e: $data.newPasswordNext,
    f: common_vendor.o(common_vendor.m(($event) => $data.newPasswordNext = $event.detail.value, {
      trim: true
    })),
    g: $data.passwordErr
  }, $data.passwordErr ? {} : {}, {
    h: $data.ifChange
  }, $data.ifChange ? {} : {
    i: common_vendor.o((...args) => $options.changePassword && $options.changePassword(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/1study/case/Love316/love316/pages/changePassword/changePassword.vue"]]);
wx.createPage(MiniProgramPage);
