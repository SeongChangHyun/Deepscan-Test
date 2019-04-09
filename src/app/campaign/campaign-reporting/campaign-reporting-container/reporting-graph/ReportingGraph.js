import LineChart from '@/components/Charts/LineChart'

const reportingType = {
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly'
}

export default {
  name: 'ReportingGraph',
  components: { LineChart },
  props: {
    graphReportingType: '',
    dataChartConverted: {}
  },
  watch: {
    dataChartConverted: {
      handler() {
        this.setOptions(this.dataChartConverted)
      },
      immediate: true
    }
  },
  data() {
    return {
      data: '',
      lineChartData: {},
      optionsChart: {},
      clientId: ''
    }
  },
  methods: {
    setOptions(chartData = {}) {
      if (!chartData.label || chartData.label.length === 0) return
      const data = chartData.line
      const type = chartData.type
      let rotateValue = 0
      if (type === reportingType.daily) {
        rotateValue = 90
      } else if (type === reportingType.weekly) {
        rotateValue = 45
      }
      this.optionsChart = {
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
    }
  }
}
