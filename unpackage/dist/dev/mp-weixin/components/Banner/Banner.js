"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "Banner",
  onLoad() {
    this.getArticleList();
  },
  data() {
    return {
      baseUrl: "https://www.ibukisk.top:3031",
      randomList: []
    };
  },
  methods: {
    getArticleList() {
      common_vendor.index.request({
        url: this.baseUrl + "/api/getarticle",
        success: (res) => {
          const list = res.data.data;
          const randomArticle = [];
          while (randomArticle.length < 5) {
            if (list.length < 5) {
              return;
            }
            const randomNum = Math.floor(Math.random() * res.data.data.length);
            if (randomArticle.indexOf(list[randomNum]) === -1) {
              randomArticle.push(list[randomNum]);
            } else {
              continue;
            }
          }
          this.randomList = randomArticle;
        }
      });
    },
    pushUrl(val) {
      if (val === "homework") {
        common_vendor.index.navigateTo({
          url: "/pages/writehomework/writehomework"
        });
      } else {
        common_vendor.index.setStorageSync("pageUrl", val);
        common_vendor.index.navigateTo({
          url: "/pages/urlView/urlView"
        });
      }
    },
    navigateToWebView(id) {
      common_vendor.index.navigateTo({
        url: "/pages/blogView/blogView?id=" + id
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.randomList, (item, k0, i0) => {
      return {
        a: $data.baseUrl + item.cover,
        b: common_vendor.t(item.title),
        c: common_vendor.o(($event) => $options.navigateToWebView(item.id)),
        d: item.id
      };
    }),
    b: common_vendor.o(($event) => $options.pushUrl("http://www.xttc.edu.cn/")),
    c: common_vendor.o(($event) => $options.pushUrl("http://portal.xttc.edu.cn/")),
    d: common_vendor.o(($event) => $options.pushUrl("homework")),
    e: common_vendor.o(($event) => $options.pushUrl("https://www.ibukisk.top"))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/1study/case/Love316/love316/components/Banner/Banner.vue"]]);
wx.createComponent(Component);
