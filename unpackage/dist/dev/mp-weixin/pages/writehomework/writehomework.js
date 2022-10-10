"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "",
      datetimesingle: "",
      content: "",
      imageValue: [],
      ifUpload: false,
      imagesNum: 0
    };
  },
  methods: {
    async upImagesOver() {
      const tokenmInfo = common_vendor.index.getStorageSync("userAccount");
      const sendTime = common_vendor.hooks().format("YYYY-MM-DD hh:mm:ss");
      const tempImageArray = new Array();
      for (let i = 0; i < this.imageValue.length; i++) {
        tempImageArray.push(this.imageValue[i].url);
      }
      const homework = {
        title: this.title,
        author: tokenmInfo,
        time: sendTime,
        deadLine: this.datetimesingle,
        content: this.content,
        images: tempImageArray,
        completeUsers: new Array(),
        notCompleteUsers: new Array()
      };
      const db = common_vendor.pn.database();
      await db.collection("homework").add(homework);
      common_vendor.index.showModal({
        title: "\u6210\u529F",
        content: "\u53D1\u5E03\u6210\u529F",
        showCancel: false,
        success() {
          common_vendor.index.reLaunch({
            url: "/pages/homework/homework"
          });
        }
      });
      this.ifUpload = false;
    },
    sendHomework() {
      this.ifUpload = true;
      if (this.title === "" || this.datetimesingle === "" || this.content === "") {
        common_vendor.index.showToast({
          title: "\u8BF7\u5B8C\u6574\u586B\u5199\u8868\u5355",
          icon: "error",
          duration: 2e3
        });
        this.ifUpload = false;
      } else {
        if (this.imagesNum > 0) {
          this.$refs.files.upload();
        } else {
          this.upImagesOver();
        }
      }
    },
    addImage(val) {
      if (val === 0) {
        this.imagesNum += 1;
      } else {
        this.imagesNum -= 1;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  (_easycom_uni_section2 + _easycom_uni_datetime_picker2 + _easycom_uni_file_picker2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_datetime_picker + _easycom_uni_file_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.title,
    b: common_vendor.o(($event) => $data.title = $event.detail.value),
    c: common_vendor.p({
      title: "\u6807\u9898(\u79D1\u76EE)",
      type: "line"
    }),
    d: common_vendor.o(($event) => $data.datetimesingle = $event),
    e: common_vendor.p({
      type: "datetime",
      modelValue: $data.datetimesingle
    }),
    f: common_vendor.p({
      title: "\u622A\u6B62\u65E5\u671F",
      type: "line"
    }),
    g: $data.content,
    h: common_vendor.o(($event) => $data.content = $event.detail.value),
    i: common_vendor.sr("files", "3a0e719f-4,3a0e719f-3"),
    j: common_vendor.o($options.upImagesOver),
    k: common_vendor.o(($event) => $options.addImage(0)),
    l: common_vendor.o(($event) => $options.addImage(1)),
    m: common_vendor.o(($event) => $data.imageValue = $event),
    n: common_vendor.p({
      limit: "9",
      title: "\u6700\u591A\u9009\u62E99\u5F20\u56FE\u7247",
      fileMediatype: "image",
      ["file-extname"]: "jpg,png",
      ["auto-upload"]: false,
      modelValue: $data.imageValue
    }),
    o: $data.ifUpload
  }, $data.ifUpload ? {} : {
    p: common_vendor.o((...args) => $options.sendHomework && $options.sendHomework(...args))
  }, {
    q: common_vendor.p({
      title: "\u4F5C\u4E1A\u5185\u5BB9",
      type: "line"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/1study/case/Love316/love316/pages/writehomework/writehomework.vue"]]);
wx.createPage(MiniProgramPage);
