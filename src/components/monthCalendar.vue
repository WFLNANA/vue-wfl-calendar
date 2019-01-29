/*
* @Author: wfl
* @Date: 2019-01-28 14:20:56
 * @Last Modified by: wfl
 * @Last Modified time: 2019-01-29 18:18:36
*/
<template>
  <section :class="theme === 'white' ? 'white-theme' : 'black-theme'" :style="{width: width + 'px',height: height + 'px','font-family': ffamily}">
    <div class="calendar-head">
      <i class="iconfont icon-tubiaozhizuo-" @click="goBack()"></i>
      <span>{{ nowYearMonth }}</span>
      <i class="iconfont icon-tubiaozhizuo-1" @click="goNext()"></i>
    </div>
    <div class="claendar-header-week">
      <div v-for="week in weekList" :key="week" class="serve-week">
          {{ week }}
      </div>
    </div>
    <div v-for="(m,index) in monthData" :key="`m${index}`">
      <div v-for="(d,dindex) in m" :key="`d${dindex}`" @click="mouseClick(d,dindex)" @mouseenter="mouseEnter(d)"
        @mouseleave="mouseLeave(d)" :class="nowDay === d.days ? 'calendar-day-now' : nowDays === d.days ? 'calendar-day-on' : 'calendar-day'"
        :style="{width: (width / 7 - 10) + 'px',height: (width / 7 - 10) + 'px'}">
        <section :style="{top: '21%'}">
          <p :class="theme === 'white' ? d.now ? 'white-now' : 'white-not-now' :  d.now ? 'black-now' : 'black-not-now'">{{
            d.day }}</p>
          <p v-show="showLanur" :class="theme === 'white' ? d.now ? 'white-now-yl' : 'white-not-now-yl' :  d.now ? 'black-now-yl' : 'black-not-now-yl'">{{
            d.tmp2 }}</p>
        </section>
        <section :id="`info_${d.days}`" class="info-panel">
          <p>{{ d.ymd }}</p>
          <p>{{ d.tmp1 }}</p>
          <p>{{ d.tmp3 }}</p>
          <p>{{ d.week }}</p>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
  import {
    parseTime,
    getMonDay,
    firstDayWeek,
    lastDayWeek,
    lastMonth,
    nextMonth,
    reorganizeDate
  } from "../utils/date";
  import showCal from "../utils/calendar";
  import "../style/style.scss";
  export default {
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
      // 
      weekList: {
        type: Array,
        dafault: []
      }
    },
    data() {
      return {
        monthData: [],
        nowYearMonth: parseTime(new Date(), "{y}-{m}"),
        nowDays: "",
        nowDay: parseTime(new Date(), "{y}-{m}-{d}"),
        monthTime: parseTime(new Date(), "{y}-{m}")
      };
    },
    methods: {
      //初始化
      init() {
        this.nowYearMonth = this.monthTime;
        //当前月份天数
        let allday = getMonDay(this.monthTime);
        //月份第一天是星期几
        let firstDay = firstDayWeek(this.monthTime);
        let lastDay = lastDayWeek(this.monthTime, allday);
        //拆完重组得到的数组 [[],[],[],[],[]]
        this.monthData = reorganizeDate(
          allday,
          firstDay,
          lastDay,
          this.monthTime
        );
      },
      mouseEnter(item) {
        if (!this.enterShow) {
          return;
        }
      },
      mouseLeave(item) {
        if (!this.enterShow) {
          return;
        }
      },
      mouseClick(item, index) {
        if (this.enterShow) {
          return;
        }
        if (this.nowDays === item.days) {
          this.nowDays = '';
        } else {
          this.nowDays === '' ? '' : document.getElementById(`info_${this.nowDays}`).style.display = "none";
          this.nowDays = item.days;
        }
        if (this.nowDays !== "") {
          document.getElementById(`info_${item.days}`).style.left = '63px';
          document.getElementById(`info_${item.days}`).style.top = '-53px';
          document.getElementById(`info_${item.days}`).style.display = "table";
        } else {
          document.getElementById(`info_${item.days}`).style.display = "none";
        }
      },
      goBack() {
        this.monthTime = lastMonth(this.monthTime);
        this.init();
      },
      goNext() {
        this.monthTime = nextMonth(this.monthTime);
        this.init();
      }
    },
    mounted() {
      this.init();
    }
  };

</script>

<style lang="sass" scoped>

</style>
