import dayjs from 'dayjs';

export function useNumberFormat(number: number): string | number {
  if (number > 100000000) {
    return Number((number / 100000000).toFixed(1)) + ' 亿';
  }

  if (number > 10000000) {
    return Number((number / 10000000).toFixed(1)) + ' 千万';
  }

  if (number > 10000) {
    return Number((number / 10000).toFixed(1)) + ' 万';
  }

  return number;
}

export function useFormatDuring(during: number) {
  const s = Math.floor(during) % 60;
  during = Math.floor(during / 60);
  const i = during % 60;

  const ii = i < 10 ? `0${i}` : i;
  const ss = s < 10 ? `0${s}` : s;

  return ii + ':' + ss;
}

// 计算两个时间间隔
export function useTimeInterval(time: number): string {
  let timestamp = new Date().getTime(); //计算当前时间戳

  //   间隔时间戳
  let interval = timestamp - time;

  //   间隔天数
  let intervalDays = interval / (24 * 60 * 60 * 1000);
  let timeInfo;
  if (intervalDays > 1) {
    timeInfo = dayjs(time).format('YYYY-MM-DD HH:MM');
  } else {
    let hours = interval / (1000 * 60 * 60);
    if (hours > 1) {
      timeInfo = parseInt(String(hours)) + '小时前';
    } else {
      let min = interval / (1000 * 60);
      if (min > 1) {
        timeInfo = parseInt(String(min)) + '分钟前';
      } else {
        let second = interval / 1000;
        timeInfo = parseInt(String(second)) + '秒前';
      }
    }
  }
  return timeInfo;
}
