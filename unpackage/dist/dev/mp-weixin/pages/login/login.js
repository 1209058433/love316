"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userAccount: "",
      userPassword: "",
      ifLoging: false
    };
  },
  methods: {
    async login() {
      if (this.userAccount === "" || this.userPassword === "") {
        common_vendor.index.showModal({
          title: "\u7B28\u6BD4",
          content: "\u8D26\u53F7\u548C\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A",
          showCancel: false
        });
        return;
      } else {
        this.ifLoging = true;
        const db = common_vendor.pn.database();
        const { result: res } = await db.collection("users").where({ account: this.userAccount }).get();
        if (!res.data[0]) {
          common_vendor.index.showModal({
            title: "\u767B\u9646\u5931\u8D25",
            content: "\u8D26\u53F7\u9519\u8BEF",
            showCancel: false
          });
          this.ifLoging = false;
        } else {
          if (res.data[0].password === this.userPassword) {
            common_vendor.index.setStorageSync("userAccount", res.data[0].account);
            common_vendor.index.showModal({
              title: "\u54DF\u897F",
              content: "\u767B\u5F55\u6210\u529F",
              showCancel: false,
              success() {
                common_vendor.index.reLaunch({
                  url: "/pages/myself/myself"
                });
              }
            });
          } else {
            common_vendor.index.showModal({
              title: "\u767B\u9646\u5931\u8D25",
              content: "\u5BC6\u7801\u9519\u8BEF",
              showCancel: false
            });
            this.ifLoging = false;
          }
        }
      }
    },
    goBackUrl() {
      common_vendor.index.navigateBack();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.userAccount,
    b: common_vendor.o(($event) => $data.userAccount = $event.detail.value),
    c: $data.userPassword,
    d: common_vendor.o(($event) => $data.userPassword = $event.detail.value),
    e: $data.ifLoging
  }, $data.ifLoging ? {} : {
    f: common_vendor.o((...args) => $options.login && $options.login(...args))
  }, {
    g: common_vendor.o((...args) => $options.goBackUrl && $options.goBackUrl(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/1study/case/Love316/love316/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
