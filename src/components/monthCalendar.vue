/*
* @Author: wfl
* @Date: 2019-02-01 14:49:49
 * @Last Modified by: wfl
 * @Last Modified time: 2019-02-01 15:17:59
*/
<template>
  <section :class="theme === 'white' ? 'white-theme' : 'black-theme'" :style="{width: width + 'px',height: height + 'px','font-family': ffamily}">
    <div class="calendar-head">
      <i class="iconfont icon-tubiaozhizuo-" @click="goBackYear()" title="上一年"></i>
      <span>{{ nowYearMonth }}</span>
      <i class="iconfont icon-tubiaozhizuo-1" @click="goNextYear()" title="下一年"></i>
    </div>
    <div class="claendar-header-week">
      <div v-for="month in monthList" :key="month" class="serve-week">
        {{ month }}
      </div>
    </div>
  </section>
</template>

<script>
  import mixins from './mixins';
  export default {
    mixins: [mixins],
    data() {
      return {


      }
    },
    methods: {

    }
  }

</script>

<style lang="sass" scoped>

</style>
