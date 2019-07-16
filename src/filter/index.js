// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '@/utils'

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function formatClassName(str = '') {
  return str.replace(/A/g, '_a')
    .replace(/B/g, '_b')
    .replace(/C/g, '_c')
    .replace(/D/g, '_d')
    .replace(/E/g, '_e')
    .replace(/F/g, '_f')
    .replace(/G/g, '_g')
    .replace(/H/g, '_h')
    .replace(/I/g, '_i')
    .replace(/J/g, '_j')
    .replace(/K/g, '_k')
    .replace(/L/g, '_l')
    .replace(/M/g, '_m')
    .replace(/N/g, '_n')
    .replace(/O/g, '_o')
    .replace(/P/g, '_p')
    .replace(/Q/g, '_q')
    .replace(/R/g, '_r')
    .replace(/S/g, '_s')
    .replace(/T/g, '_t')
    .replace(/U/g, '_u')
    .replace(/V/g, '_v')
    .replace(/W/g, '_w')
    .replace(/X/g, '_x')
    .replace(/Y/g, '_y')
    .replace(/Z/g, '_z')
}
