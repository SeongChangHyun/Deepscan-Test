import LineChart from '@/components/Charts/LineChart'
import { chartConfig, reportingType } from '@/common/constants'

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
          axisLine: chartConfig.axisLine,
          axisLabel: {
            color: chartConfig.colorLabelDefault,
            fontSize: chartConfig.fontSize,
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
        grid: chartConfig.containerStyle,
        tooltip: chartConfig.tooltip,
        yAxis: {
          axisLine: chartConfig.axisLine
        },
        legend: {
          data: data.map(item => {
            return item.name
          }),
          bottom: 36,
          itemWidth: 50,
          textStyle: {
            fontSize: chartConfig.fontSize
          }
        },
        dataZoom: [chartConfig.dataZoomContent, chartConfig.dataZoomBottom],
        series: [
          ...data.map((item, index) => {
            const color = item.color || chartConfig.colorDefault
            return {
              symbolSize: chartConfig.symbolSize,
              hoverAnimation: false,
              name: item.name,
              itemStyle: {
                normal: {
                  color,
                  borderColor: color,
                  lineStyle: {
                    color,
                    width: chartConfig.lineWidth
                  }
                }
              },
              smooth: false,
              type: chartConfig.typeLineChart,
              data: item.data,
              animationDuration: chartConfig.animationDuration,
              animationEasing: chartConfig.animationEasing
            }
          })
        ]
      }
      this.optionsChart = { ...this.optionsChart }
    }
  }
}
