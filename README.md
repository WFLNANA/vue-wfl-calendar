# vue-wfl-calendar

> a calendar of vue by wfl

## USE API

### 1.在main.js中引入vue-wfl-calendar
#####   import VueWflCalendar from 'vue-wfl-calendar';
#####   Vue.use(VueWflCalendar)
#####  配置项：
    //  主题 - 目前只有默认
      theme: {
        type: String,
        default: 'white'
      },
      //  阴历
      showLanur: {
        type: Boolean,
        default: true
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
      //  月历
      isMonth: {
        type: Boolean,
        default: false
      },
      //  日历
      isDay: {
        type: Boolean,
        default: true
      },
      //  周历
      isWeek: {
        type: Boolean,
        default: false
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







