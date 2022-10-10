"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      week: 0,
      single: "",
      ifSchool: true,
      ifChangeStartDate: false,
      ifLogin: true
    };
  },
  created() {
    this.getSchoolStartDate();
    this.ifLog();
  },
  methods: {
    toggle() {
      this.ifChangeStartDate = !this.ifChangeStartDate;
    },
    async getSchoolStartDate() {
      const db = common_vendor.pn.database();
      const { result: res } = await db.collection("schoolWeek").where({ id: 1 }).get();
      this.single = res.data[0].goSchoolDate;
      const startDate = +new Date(this.single);
      const nowDateMoment = common_vendor.hooks().format("YYYY-MM-DD");
      const nowDate = +new Date(nowDateMoment);
      const nowWeek = Math.floor((nowDate - startDate) / 1e3 / 60 / 60 / 24 / 7) + 1;
      if (nowWeek > 16) {
        this.ifSchool = false;
      } else {
        this.week = nowWeek;
      }
    },
    ifLog() {
      const token = common_vendor.index.getStorageSync("userAccount");
      if (token) {
        this.ifLogin = false;
      }
    }
  },
  watch: {
    async single(newValue, oldValue) {
      if (oldValue !== "") {
        const db = common_vendor.pn.database();
        await db.collection("schoolWeek").where({ id: 1 }).update({
          goSchoolDate: newValue
        });
        this.getSchoolStartDate();
        common_vendor.index.showToast({
          icon: "success",
          title: "\u66F4\u65B0\u6210\u529F",
          duration: 2e3
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_my_curriculum2 = common_vendor.resolveComponent("my-curriculum");
  (_easycom_uni_section2 + _easycom_uni_datetime_picker2 + _easycom_my_curriculum2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_my_curriculum = () => "../../components/my-curriculum/my-curriculum.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_datetime_picker + _easycom_my_curriculum)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "\u5F00\u5B66\u65F6\u95F4\uFF1A" + $data.single,
      type: "line"
    }),
    b: $data.ifChangeStartDate
  }, $data.ifChangeStartDate ? {
    c: common_vendor.o(($event) => $data.single = $event),
    d: common_vendor.p({
      type: "date",
      ["clear-icon"]: false,
      modelValue: $data.single
    })
  } : {}, {
    e: $data.ifSchool
  }, $data.ifSchool ? {
    f: common_vendor.t($data.week)
  } : {}, {
    g: common_vendor.o((...args) => $options.toggle && $options.toggle(...args)),
    h: $data.ifLogin,
    i: common_vendor.p({
      ifLogin: $data.ifLogin
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/1study/case/Love316/love316/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
