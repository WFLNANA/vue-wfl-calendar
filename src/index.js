import VueWflCalendar from './components/calendar';
import './style/base.scss';

const WflCalendar = {
  install: function (Vue) {
    Vue.component(VueWflCalendar.name, VueWflCalendar)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(WflCalendar)
}
export default WflCalendar
