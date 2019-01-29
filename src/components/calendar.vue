/*
* @Author: wfl
* @Date: 2019-01-28 14:05:01
 * @Last Modified by: wfl
 * @Last Modified time: 2019-01-29 18:18:00
*/
<template>
  <section>
    <month-calendar v-if="isMonth" :tmeme="theme" :width="width" :height="height" :showLanur="showLanur" :weekList="weekList"/>
  </section>
</template>

<script>
  import monthCalendar from './monthCalendar';
  export default {
    components: {
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
        default: true
      },
      //  日历
      isDay: {
        type: Boolean,
        default: false
      },
      //  周历
      isWeek: {
        type: Boolean,
        default: false
      },
    },
    data(){
      return {
        weekList: ['一','二','三','四','五','六','七']
      }
    }
  }

</script>

<style lang="sass" scoped>

</style>
