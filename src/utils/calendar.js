/*
 * @Author: wfl 
 * @Date: 2018-11-27 18:08:05 
 * @Last Modified by: wfl
 * @Last Modified time: 2019-01-29 17:16:48
 * @  获取当前年月日星期  + 农历年 日期
 */
const showCal = function (nowDate) {
  nowDate = nowDate ? nowDate : '';
  let today = new Date(nowDate);
  var dataArr = {};
  let jieri = '';
  let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  dataArr.ymd = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  dataArr.week = `${weeks[today.getDay()]}`;
  var calendar = new Date(nowDate);
  var month = calendar.getMonth();
  var date = calendar.getDate();
  
  // if ((month == 0) && (date == 1)) jieri = "元旦";
  // if ((month == 1) && (date == 13)) jieri = "除夕";
  // if ((month == 1) && (date == 14)) jieri = "春节/情人节";
  // if ((month == 2) && (date == 1)) jieri = "国际海豹日";
  // if ((month == 2) && (date == 8)) jieri = "国际劳动妇女节/中国保护母亲河日";
  // if ((month == 2) && (date == 12)) jieri = "植树节";

  // if ((month == 3) && (date == 1)) jieri = "愚人节";
  // if ((month == 3) && (date == 5)) jieri = "清明节";
  // if ((month == 4) && (date == 1)) jieri = "国际劳动节";
  // if ((month == 4) && (date == 9)) jieri = "母亲节";

  // if ((month == 5) && (date == 1)) jieri = "国际儿童节";
  // if ((month == 5) && (date == 26)) jieri = "国际禁毒日";

  // if ((month == 7) && (date == 1)) jieri = "建军节";
  // if ((month == 7) && (date == 15)) jieri = "日本无条件投降日/世纪婚纱日";
  // if ((month == 7) && (date == 16)) jieri = "七夕情人节";


  // if ((month == 9) && (date == 20)) jieri = "世界厨师日";
  // if ((month == 9) && (date == 22)) jieri = "世界传统医药日";
  // if ((month == 9) && (date == 24)) jieri = "联合国日/世界发展信息日";
  // if ((month == 9) && (date == 25)) jieri = "世界骨质疏松日/抗美援朝纪念日/环卫工人节";
  // if ((month == 9) && (date == 31)) jieri = "世界勤俭日/中国男性健康日";

  // if ((month == 11) && (date == 24)) jieri = "平安夜";
  // if ((month == 11) && (date == 25)) jieri = "圣诞节";

  /*农历部分*/

  var CalendarData = new Array(100);
  var madd = new Array(12);
  var tgString = "甲乙丙丁戊己庚辛壬癸";
  var dzString = "子丑寅卯辰巳午未申酉戌亥";
  var numString = "一二三四五六七八九十";
  var monString = "正二三四五六七八九十冬腊";
  var weekString = "日一二三四五六";
  var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
  var cYear, cMonth, cDay, TheDate;
  CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
  madd[0] = 0;
  madd[1] = 31;
  madd[2] = 59;
  madd[3] = 90;
  madd[4] = 120;
  madd[5] = 151;
  madd[6] = 181;
  madd[7] = 212;
  madd[8] = 243;
  madd[9] = 273;
  madd[10] = 304;
  madd[11] = 334;

  function GetBit(m, n) {
    return (m >> n) & 1;
  }

  function e2c() {
    TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
    var total, m, n, k;
    var isEnd = false;
    var tmp = TheDate.getYear();
    if (tmp < 1900) {
      tmp += 1900;
    }
    total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

    if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
      total++;
    }
    for (m = 0;; m++) {
      k = (CalendarData[m] < 0xfff) ? 11 : 12;
      for (n = k; n >= 0; n--) {
        if (total <= 29 + GetBit(CalendarData[m], n)) {
          isEnd = true;
          break;
        }
        total = total - 29 - GetBit(CalendarData[m], n);
      }
      if (isEnd) break;
    }
    cYear = 1921 + m;
    cMonth = k - n + 1;
    cDay = total;
    if (k == 12) {
      if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
        cMonth = 1 - cMonth;
      }
      if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
        cMonth--;
      }
    }
  }

  function GetcDateString() {
    var tmp1 = "";
    var tmp2 = "";
    var tmp3 = "";
    tmp1 += tgString.charAt((cYear - 4) % 10);
    tmp1 += dzString.charAt((cYear - 4) % 12);
    tmp1 += "(";
    tmp1 += sx.charAt((cYear - 4) % 12);
    tmp1 += ")年 ";
    if (cMonth < 1) {
      tmp2 += "(闰)";
      tmp2 += monString.charAt(-cMonth - 1);
      tmp3 += monString.charAt(-cMonth - 1);
    } else {
      tmp2 += monString.charAt(cMonth - 1);
      tmp3 += monString.charAt(cMonth - 1);
    }
    tmp2 += "月";
    tmp3 += "月";
    if(cDay === 1){
      tmp2 += ''
    }else{
      tmp2 = (cDay < 11) ? "初" + numString.charAt((cDay - 1) % 10) : (cDay === 10) ? '初十' : ((cDay < 20) ? "十" + numString.charAt((cDay - 1) % 10) : (cDay === 20) ? '二十' : ((cDay < 30) ? "廿" + numString.charAt((cDay - 1) % 10) : "三十"));
    }
    tmp3 += (cDay < 11) ? "初" + numString.charAt((cDay - 1) % 10) : (cDay === 10) ? '初十' : ((cDay < 20) ? "十" + numString.charAt((cDay - 1) % 10) : (cDay === 20) ? '二十' : ((cDay < 30) ? "廿" + numString.charAt((cDay - 1) % 10) : "三十"));

    dataArr.tmp1 = tmp1;
    dataArr.tmp2 = tmp2;
    dataArr.tmp3 = tmp3;
    dataArr.jieri = jieri;
    return dataArr;
  }

  function GetLunarDay(solarYear, solarMonth, solarDay) {
    //solarYear = solarYear<1900?(1900+solarYear):solarYear;
    solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
    e2c(solarYear, solarMonth, solarDay);
    return GetcDateString();
  }

  function showCal(yy, mm, dd) {
    return GetLunarDay(yy, mm, dd);
  }

  return showCal(today.getFullYear(), today.getMonth() + 1, today.getDate())
}

export default showCal;
