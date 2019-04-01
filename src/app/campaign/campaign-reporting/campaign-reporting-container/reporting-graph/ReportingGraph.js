import LineChart from '@/components/Charts/LineChart'
import { graphFilterColor } from '@/common/constants'

const dataDaily = {
  label: ['2019-03-01', '2019-03-02', '2019-03-03', '2019-03-04', '2019-03-05', '2019-03-06', '2019-03-07', '2019-03-08',
    '2019-03-09', '2019-03-10', '2019-03-11', '2019-03-12', '2019-03-13', '2019-03-14', '2019-03-15', '2019-03-16',
    '2019-03-17', '2019-03-18', '2019-03-19', '2019-03-20', '2019-03-21', '2019-03-22', '2019-03-23', '2019-03-24',
    '2019-03-25', '2019-03-26', '2019-03-27', '2019-03-28', '2019-03-28', '2019-03-30', '2019-03-31'],
  type: 'daily',
  line: [
    {
      name: 'Daily Click Count',
      data: [5, 10, 7, 8, 2, 4, 6, 3, 5, 7, 5, 1, 2, 6, 4, 8, 6, 2, 5, 9, 1, 3, 4, 5, 7, 8, 9, 5, 6, 4, 6],
      color: graphFilterColor.one
    },
    {
      name: 'Daily Imp Count',
      data: [6, 7, 7, 1, 6, 8, 9, 3, 10, 5, 3, 4, 1, 2, 6, 7, 9, 0, 1, 7, 1, 5, 2, 7, 8, 10, 11, 17, 6, 9, 7],
      color: graphFilterColor.two
    },
    {
      name: 'Daily CTR Count',
      data: [3, 2, 5, 7, 8, 1, 3, 7, 10, 11, 14, 7, 8, 9, 5, 2, 3, 4, 9, 0, 2, 5, 7, 4, 5, 3, 9, 10, 11, 5, 9],
      color: graphFilterColor.three
    },
    {
      name: 'Daily Spend Count',
      data: [6, 5, 7, 3, 9, 9, 7, 10, 17, 12, 11, 9, 5, 3, 6, 7, 3, 1, 7, 8, 10, 9, 5, 4, 8, 3, 2, 8, 2, 8, 2],
      color: graphFilterColor.four
    }
  ]
}

const dataWeekly = {
  label: ['2018/11/29~2018/12/02', '2018/12/03~2018/12/09', '2018/12/10~2018/12/16', '2018/12/17~2018/12/23', '2018/12/24~2018/12/30', '2018/12/31~2019/01/06',
    '2019/01/07~2019/01/13', '2019/01/14~2019/01/20', '2019/01/21~2019/01/27', '2019/01/28~2019/02/03', '2019/02/04~2019/02/10', '2019/02/11~2019/02/17', '2019/02/18~2019/02/24', '2019/02/25~2019/02/27'],
  type: 'weekly',
  line: [
    {
      name: 'Weekly Click Count',
      data: [6, 21, 17, 13, 16, 21, 18, 15, 17, 16, 21, 17, 17, 21],
      color: graphFilterColor.one
    },
    {
      name: 'Weekly Imp Count',
      data: [7, 21, 17, 1, 16, 21, 18, 15, 12, 16, 21, 17, 17, 26],
      color: graphFilterColor.two
    },
    {
      name: 'Weekly CTR Count',
      data: [8, 8, 17, 13, 10, 21, 18, 15, 17, 16, 21, 17, 17, 20],
      color: graphFilterColor.three
    },
    {
      name: 'Weekly Spend Count',
      data: [9, 4, 17, 13, 16, 6, 18, 15, 10, 16, 16, 10, 17, 29],
      color: graphFilterColor.four
    }
  ]
}

const dataMonthly = {
  label: ['2018/11/29~2018/11/30', '2018/12/01~2018/12/31', '2019/01/01~2019/01/31', '2019/02/01~2019/02/27'],
  type: 'monthly',
  line: [
    {
      name: 'Monthly Click Count',
      data: [5, 75, 76, 84],
      color: graphFilterColor.one
    },
    {
      name: 'Monthly Imp Count',
      data: [6, 60, 80, 85],
      color: graphFilterColor.two
    },
    {
      name: 'Monthly CTR Count',
      data: [7, 80, 86, 84],
      color: graphFilterColor.three
    },
    {
      name: 'Monthly Spend Count',
      data: [8, 100, 70, 80],
      color: graphFilterColor.four
    }
  ]
}

const reportingType = {
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly'
}

export default {
  name: 'ReportingGraph',
  components: { LineChart },
  props: {
    graphReportingType: ''
  },
  data() {
    return {
      lineChartData: dataDaily,
      optionsChart: ''
    }
  },
  watch: {
    graphReportingType: {
      handler(val, oldVal) {
        this.changeChartType(val)
      },
      immediate: true
    }
  },
  methods: {
    changeChartType(type) {
      switch (type) {
        case reportingType.daily:
          this.lineChartData = dataDaily
          break
        case reportingType.weekly:
          this.lineChartData = dataWeekly
          break
        case reportingType.monthly:
          this.lineChartData = dataMonthly
          break
        default:
          this.lineChartData = dataDaily
      }
      this.setOptions(this.lineChartData)
    },
    setOptions(chartData = {}) {
      const data = chartData.line
      const type = chartData.type
      let rotateValue = 0
      if (type === reportingType.daily) {
        rotateValue = 90
      } else if (type === reportingType.weekly) {
        rotateValue = 45
      }
      const optionsSettingChart = {
        title: {
          x: 'center',
          text: data[0].name,
          textStyle: {
            align: 'center',
            color: 'black',
            verticalAlign: 'middle'
          }
        },
        xAxis: {
          data: chartData.label.map((str) => {
            if (type === reportingType.monthly) {
              return str.replace('~', '\n~')
            }
            return str
          }),
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'black',
              width: 1
            }
          },
          axisLabel: {
            color: 'black',
            fontSize: 14,
            rotate: rotateValue,
            showMaxLabel: true,
            formatter(params) {
              if (type === reportingType.weekly) {
                return params.split('~')[0] + '...'
              }
              return params
            }
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 80,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: 'black',
              width: 1
            }
          }
        },
        legend: {
          data: data.map(item => {
            return item.name
          }),
          bottom: 20,
          itemWidth: 50,
          textStyle: {
            fontSize: 14
          }
        },
        series: [
          ...data.map((item, index) => {
            const color = item.color || '#FF005A'
            return {
              symbol: 'circle',
              symbolSize: 6,
              hoverAnimation: false,
              name: item.name,
              itemStyle: {
                normal: {
                  color,
                  borderColor: color,
                  lineStyle: {
                    color,
                    width: 3
                  }
                }
              },
              smooth: false,
              type: 'line',
              data: item.data,
              animationDuration: 2000,
              animationEasing: 'blackIn'
            }
          })
        ]
      }
      this.optionsChart = optionsSettingChart
    }
  }
}
