"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      homeworkInfo: {},
      canNotRadio: true,
      ifCheckRadio: false,
      authorInfo: {}
    };
  },
  async onLoad(option) {
    const homeworkId = option.id;
    const db = common_vendor.pn.database();
    const { result: res } = await db.collection("homework").where({ _id: homeworkId }).get();
    this.homeworkInfo = res.data[0];
    const tokenInfo = common_vendor.index.getStorageSync("userAccount");
    if (tokenInfo) {
      this.canNotRadio = false;
      const db2 = common_vendor.pn.database();
      const { result: res2 } = await db2.collection("homework").where({ _id: this.homeworkInfo._id }).get();
      const tempArray = res2.data[0].completeUsers;
      tempArray.indexOf(tokenInfo);
      if (tempArray.indexOf(tokenInfo) !== -1) {
        this.ifCheckRadio = true;
      } else {
        this.ifCheckRadio = false;
      }
    }
    const rasult = await db.collection("users").where({ account: this.homeworkInfo.author }).get();
    const authorInfo = rasult.result.data[0];
    this.authorInfo = authorInfo;
  },
  methods: {
    preview(url) {
      common_vendor.index.previewImage({
        urls: [url]
      });
    },
    async changeRandio(val) {
      if (val.detail.value === "1") {
        const tokenInfo = common_vendor.index.getStorageSync("userAccount");
        const db = common_vendor.pn.database();
        const { result: res } = await db.collection("homework").where({ _id: this.homeworkInfo._id }).get();
        const tempArray = res.data[0].completeUsers;
        if (tempArray.indexOf(tokenInfo) === -1) {
          tempArray.push(tokenInfo);
          await db.collection("homework").where({ _id: this.homeworkInfo._id }).update({ completeUsers: tempArray });
          common_vendor.index.showToast({
            title: "\u4FEE\u6539\u6210\u529F",
            duration: 2e3
          });
        } else {
          common_vendor.index.showToast({
            title: "\u5DF2\u7ECF\u5728\u5B8C\u6210\u5217\u8868\u4E2D",
            duration: 2e3
          });
        }
      } else {
        const tokenInfo = common_vendor.index.getStorageSync("userAccount");
        const db = common_vendor.pn.database();
        const { result: res } = await db.collection("homework").where({ _id: this.homeworkInfo._id }).get();
        const tempArray = res.data[0].completeUsers;
        const arrIndex = tempArray.indexOf(tokenInfo);
        tempArray.splice(arrIndex, 1);
        await db.collection("homework").where({ _id: this.homeworkInfo._id }).update({ completeUsers: tempArray });
        common_vendor.index.showToast({
          title: "\u4FEE\u6539\u6210\u529F",
          duration: 2e3
        });
      }
    },
    delThis() {
      const info = this.homeworkInfo;
      common_vendor.index.showModal({
        title: "\u5220\u9664",
        content: "\u786E\u5B9A\u8981\u5220\u9664\u5417",
        success(val) {
          if (val.confirm === true) {
            common_vendor.index.showModal({
              title: "\u518D\u6B21\u786E\u8BA4",
              content: "\u786E\u5B9A\u8981\u5220\u9664\u6B64\u4F5C\u4E1A\u5417",
              async success(val2) {
                if (val2.confirm === true) {
                  console.log(info);
                  const delImg = common_vendor.pn.importObject("delClassImg");
                  info.images.map(async (item) => {
                    await delImg.delImg(item);
                  });
                  const db = common_vendor.pn.database();
                  await db.collection("homework").where({ _id: info._id }).remove();
                  common_vendor.index.showModal({
                    title: "\u5B8C\u6210",
                    content: "\u5220\u9664\u5B8C\u6210",
                    showCancel: false,
                    success() {
                      common_vendor.index.navigateBack({
                        delta: 1
                      });
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.homeworkInfo.title),
    b: common_vendor.t($data.homeworkInfo.deadLine),
    c: !$data.ifCheckRadio,
    d: $data.canNotRadio,
    e: $data.ifCheckRadio,
    f: $data.canNotRadio,
    g: common_vendor.o((...args) => $options.changeRandio && $options.changeRandio(...args)),
    h: common_vendor.t($data.homeworkInfo.content),
    i: common_vendor.f($data.homeworkInfo.images, (item, k0, i0) => {
      return {
        a: item,
        b: item,
        c: common_vendor.o(($event) => $options.preview(item), item)
      };
    }),
    j: $data.authorInfo.headImg,
    k: common_vendor.t($data.authorInfo.nickName),
    l: common_vendor.t($data.homeworkInfo.time),
    m: common_vendor.o((...args) => $options.delThis && $options.delThis(...args)),
    n: $data.canNotRadio
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/1study/case/Love316/love316/pages/homeworkDetails/homeworkDetails.vue"]]);
wx.createPage(MiniProgramPage);
