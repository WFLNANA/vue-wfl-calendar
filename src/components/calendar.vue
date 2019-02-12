/*
* @Author: wfl
* @Date: 2019-01-28 14:05:01
 * @Last Modified by: wfl
 * @Last Modified time: 2019-02-01 15:13:07
*/
<template>
  <section>
    <day-calendar v-if="isDay" :ffamily="ffamily" :tmeme="theme" :width="width" :height="height" :showLanur="showLanur" :weekList="weekList"/>
    <month-calendar v-else-if="isMonth"  :ffamily="ffamily" :tmeme="theme" :width="width" :height="height" :showLanur="showLanur" :monthList="monthList"></month-calendar>
  </section>
</template>

<script>
  import dayCalendar from './dayCalendar';
  import monthCalendar from './monthCalendar';
  export default {
    name: 'VueWflCalendar',
    components: {
      dayCalendar,
      monthCalendar
    },
    props: {
      //  主题
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
    },
    data(){
      return {
        weekList: ['一','二','三','四','五','六','七'],
        monthList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      }
    },
    mounted() {
    },
  }

</script>

<style lang="sass" scoped>

</style>
