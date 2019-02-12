var mixins = {
  props: {
    //  主题
    theme: {
      type: String,
      default: "white"
    },
    //  宽
    width: {
      type: Number,
      default: 500
    },
    //  高
    height: {
      type: Number,
      default: 500
    },
    //  阴历
    showLanur: {
      type: Boolean,
      default: true
    },
    //  鼠标移入显示详细信息
    enterShow: {
      type: Boolean,
      default: false
    },
    //  字体
    ffamily: {
      type: String,
      default: 'fantasy'
    },
    //  星期
    weekList: {
      type: Array,
      dafault: []
    },
    //  月份
    monthList: {
      type: Array,
      dafault: []
    }
  },
}


export default mixins;