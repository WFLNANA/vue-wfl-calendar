/**
    @author: wfl
    @time: 2018/4/19
    @des: 日历相关方法
 */
import showCal from './calendar';
var calendarL = 0;

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time == 'object') {
    date = time;
  } else {
    if (('' + time).length === 10)
      time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

// 上一年
export function lastYear(date) {
  let arr = date.split("-");
  let year = arr[0]; //获取当前日期的年份
  let month = Number.parseInt(arr[1]); //获取当前日期的月份
  return `${Number.parseInt(year) - 1}-${month < 10 ? '0'+ month : month}`;
}

// 下一年
export function nextYear(date) {
  let arr = date.split("-");
  let year = arr[0]; //获取当前日期的年份
  let month = Number.parseInt(arr[1]); //获取当前日期的月份
  return `${Number.parseInt(year) + 1}-${month < 10 ? '0'+ month : month}`;
}

//上一月
export function lastMonth(date) {
  let arr = date.split("-");
  let year = arr[0]; //获取当前日期的年份
  let month = arr[1]; //获取当前日期的月份
  let year2 = year;
  let month2 = parseInt(month) - 1;
  if (month2 == 0) {
    year2 = parseInt(year2) - 1;
    month2 = 12;
  }
  if (month2 < 10) {
    month2 = "0" + month2;
  }
  let t2 = year2 + "-" + month2;
  return t2;
}

//下一月
export function nextMonth(date) {
  let dates = new Date();
  let y = dates.getFullYear();
  let m = dates.getMonth() + 1;
  let arr = date.split("-");
  let year = arr[0]; //获取当前日期的年份
  let month = arr[1]; //获取当前日期的月份
  let year2 = year;
  let month2 = parseInt(month) + 1;
  if (month2 == 13) {
    year2 = parseInt(year2) + 1;
    month2 = 1;
  }
  if (month2 < 10) {
    month2 = "0" + month2;
  }
  let t2 = year2 + "-" + month2;
  return t2;
}

//获取每月的第一天是星期几
export function firstDayWeek(date) {
  let day = date + '-01'
  let myDatesss = new Date(day);
  return myDatesss.getDay()
}

//获取每月的最后一天是星期几
export function lastDayWeek(date, days) {
  let day = `${date}-${days}`
  let myDatesss = new Date(day);
  return myDatesss.getDay()
}

//获取每月的几号是星期几
export function MonthDayWeek(day, state = false, isAllDate = false) {
  let myDatesss = '';
  if (!isAllDate) {
    let year = new Date().getFullYear();
    myDatesss = new Date(`${year}-${day}`);
  } else {
    myDatesss = new Date(`${day}`);
  }
  let week = myDatesss.getDay();
  if (state) {
    switch (week) {
      case 0:
        return '日';
      case 1:
        return '一';
      case 2:
        return '二';
      case 3:
        return '三';
      case 4:
        return '四';
      case 5:
        return '五';
      case 6:
        return '六';
    }
  } else {
    switch (week) {
      case 0:
        return '周日';
      case 1:
        return '周一';
      case 2:
        return '周二';
      case 3:
        return '周三';
      case 4:
        return '周四';
      case 5:
        return '周五';
      case 6:
        return '周六';
    }
  }
}

//获取每月的天数
export function getMonDay(date, flag=false) {
  let days = date.split('-').map((v)=> Number.parseInt(v))
  if(flag){
    days[1] = days[1] === 1 ? 12 : days[1] - 1
    days[0] = days[1] === 1 ? days[0] - 1 : days[0]
  }
  let day = new Date(days[0], days[1], '0');
  return Number.parseInt(day.getDate());
}

//获得整理后的数据 从周一开始
export function reorganizeDate(allday, firstDay, lastDay, yearMonth) {
  //所有天数
  let allDays = [];
  //j  周几
  let j = firstDay;
  for (let i = 1; i <= allday; i++) {
    //初始数组中无值直接push
    if (allDays.length === 0) {
      allDays.push({
        day: i,
        week: firstDay,
        days: `${yearMonth}-${i < 10 ? '0'+ i : i}`,
        weekName: MonthDayWeek(`${yearMonth}-${i}`, true, true),
        now: true
      });
      j++;
    } else {
      //满7天重新从周一开始
      if (j === 7) {
        j = 0;
      }
      allDays.push({
        day: i,
        week: j,
        days: `${yearMonth}-${i < 10 ? '0'+ i : i}`,
        weekName: MonthDayWeek(`${yearMonth}-${i}`, true, true),
        now: true
      });
      j++;
    }
  }
  //如果第一天不是周一 则添加空补全
  if (firstDay !== 1) {
    let lastAllDay = getMonDay(yearMonth, true)
    let add = [];
    //如果是周天  push 6条补全
    if (firstDay === 0) {
      add = pushDay(6, lastAllDay, yearMonth, true);
      //否则 是周几push 几-1条补全
    } else {
      add = pushDay(firstDay - 1, lastAllDay, yearMonth, true);
    }
    allDays = [...add, ...allDays];
  }
  if (lastDay !== 0) {
    allDays = [...allDays, ...pushDay(7 - lastDay, allday, yearMonth, false)]
  }
  //将得到的数组按7条为一组拆开重组
  let outDay = [];
  let outDays = [];
  let m = 0;
  for (let i = 0; i < allDays.length; i++) {
    if (m < 7) {
      showCal(allDays[i].days)
      outDay.push({
        ...allDays[i],
        ...showCal(allDays[i].days)
      });
      m++;
      //最后一组
      if (i === allDays.length - 1) {
        outDays.push(outDay);
      }
    } else {
      outDays.push(outDay);
      m = 0;
      i--;
      outDay = [];
    }
  }
  //拆完重组得到的数组 [[],[],[],[],[]]
  if (outDays.length === 4) {
    let arr = [...pushDayAll(outDays[3][6].day, 7, allday, yearMonth)];
    outDays.push(arr)
  }

  if (outDays.length === 5) {
    let arr = [...pushDayAll(outDays[4][6].day, 7, allday, yearMonth)];
    outDays.push(arr)
  }


  return [...outDays];
}

//不是周一补全
function pushDayAll(num, numALL, allday, yearMonth) {
  if (num > 8) {
    num = 0
  }
  let date = new Date(`${yearMonth}-${allday}`).getTime() + 86400000;
  let add = [];
  let ym = `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1 > 10 ? new Date(date).getMonth() + 1 : '0' + (new Date(date).getMonth() + 1)}`;
  for (let i = num; i < num + 7; i++) {
    add.push({
      ...showCal(`${ym}-${i + 1 > 9 ? i + 1 : '0' + (i + 1)}`),
      day: new Date(`${ym}-${i + 1}`).getDate(),
      week: new Date(`${ym}-${i + 1}`).getDay(),
      days: `${ym}-${i + 1 > 9 ? i + 1 : '0' + (i + 1)}`,
      weekName: MonthDayWeek(`${ym}-${i + 1}`, true, true),
      now: false
    });
  }
  return add;
}

//不是周一补全
function pushDay(num, allday, yearMonth, statu) {
  let bqnum = allday;
  let date;
  if (statu) {
    date = new Date(`${yearMonth}-01`).getTime() - 86400000;
  } else {
    date = new Date(`${yearMonth}-${allday}`).getTime() + 86400000;
  }
  let add = [];
  let ym = `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1 > 10 ? new Date(date).getMonth() + 1 : '0' + (new Date(date).getMonth() + 1)}`;
  for (let i = 0; i < num; i++) {
    if (statu) {
      add.unshift({
        day: new Date(`${ym}-${allday - i}`).getDate(),
        week: new Date(`${ym}-${allday - i}`).getDay(),
        days: `${ym}-${allday - i}`,
        weekName: MonthDayWeek(`${ym}-${allday - i}`, true, true),
        now: false
      });
    } else {
      add.push({
        day: new Date(`${ym}-${i + 1}`).getDate(),
        week: new Date(`${ym}-${i + 1}`).getDay(),
        days: `${ym}-${i + 1 > 9 ? i + 1 : '0' + (i + 1)}`,
        weekName: MonthDayWeek(`${ym}-${i + 1}`, true, true),
        now: false
      });
    }
  }
  return add;
}

//将一年按月份每组三个划分[[1,2,3],[4,5,6],[7,8,9],[10,11,12]]
export function yearToMonth() {
  let arrs = [];
  let m = 1;
  for (let i = 0; i < 4; i++) {
    let arr = [];
    for (let j = 0; j < 3; j++) {
      arr.push({
        name: `${m}月`,
        id: m,
      })
      m++;
    }
    arrs.push(arr);
  }
  return arrs;
}

export function nowDay() {
  let date = new Date();
  var formetDate = date;
  var Year = 0;
  var Month = 0;
  var Day = 0;
  var CurrentDate = "";
  Year = formetDate.getFullYear(); //ie火狐下都可以
  Month = formetDate.getMonth() + 1;
  Day = formetDate.getDate();
  CurrentDate += Year + "-";
  if (Month >= 10) {
    CurrentDate += Month + "-";
  } else {
    CurrentDate += "0" + Month + "-";
  }
  if (Day >= 10) {
    CurrentDate += Day;
  } else {
    CurrentDate += "0" + Day;
  }
  return CurrentDate;
}
