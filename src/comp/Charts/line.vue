<template>
  <div :class="className" :id="id" :style="{ width: width, height: height}"></div>
</template>
<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'
  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'line-chart'
      },
      id: {
        type: String,
        default: 'line-chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '200px'
      },
      settings: Object
    },
    data() {
      let {
        series,
        legend,
        xAxis
      } = this.settings
      return {
        chart: null,
        series,
        legend,
        xAxis
      }
    },
    mounted() {
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) return
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id))
        let me = this
        this.chart.setOption({
          title: {
            top: 20,
            text: 'Requests',
            textStyle: {
              fontWeight: 'normal',
              fontSize: '16px',
              color: '#fff'
            },
            left: '1%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: '#576178'
            }
          },
          legend: {
            top: 20,
            right: '4%',
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: me.legend.data,
            textStyle: {
              fontSize: 12,
              color: '#F1F1F3'
            }
          },
          grid: {
            top: 100,
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: me.xAxis.data,
            axisLine: {
              lineStyle: {
                color: '#2F5C79'
              }
            }
          },
          yAxis: {
            type: 'value',
            name: '%',
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#2F5C79'
              }
            }, // 去除网格线
            axisLine: {
              lineStyle: {
                color: '#2F5C79'
              }
            }
          },
          series: me.series
        })
      }
    }
  }
</script>

