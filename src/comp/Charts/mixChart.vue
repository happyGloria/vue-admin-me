<template>
  <div :class="className" :id="id" :style="{ width: width, height: height }"></div>
</template>

<script>
  import resize from './mixins/resize.js'
  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'mix-chart'
      },
      id: {
        type: String,
        default: 'mix-chart'
      },
      width: {
        type: String,
        default: '100px'
      },
      height: {
        type: String,
        default: '100px'
      },
      settings: Object
    },
    data () {
      let {
        title,
        series,
        legend
      } = this.settings
      return {
        chart: null,
        title,
        series,
        legend
      }
    },
    mounted () {
      this.initChart()
    },
    methods: {
      initChart () {
        var me = this
        this.chart = this.$eCharts.init(document.getElementById(this.id))
        const xData = (function () {
          const data = []
          for (var i = 1; i < 13; i++) {
            data.push(i)
          }
          return data
        })()

        this.chart.setOption({
          title: {
            text: me.title.text,
            x: '20',
            top: '20',
            textStyle: {
              color: '#fff',
              fontSize: '16'
            },
            subtextStyle: {
              color: '#90979c',
              fontSize: '16'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          grid: {
            borderWidth: 0,
            top: 110,
            bottom: 95,
            textStyle: {
              color: '#fff'
            }
          },
          legend: {
            /* x: '5%', */
            top: '12%',
            right: '50px',
            textStyle: {
              color: '#90979c'
            },
            data: me.legend.data
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0

            },
            data: xData
          }],
          yAxis: [{
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            splitArea: {
              show: false
            }
          }],
          dataZoom: [
            {
              show: true,
              height: 30,
              xAxisIndex: [
                0
              ],
              bottom: 30,
              start: 0,
              end: 100,
              handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
              handleSize: '110%',
              handleStyle: {
                color: '#d3dee5'
              },
              textStyle: {
                color: '#c1c1c1 '
              },
              borderColor: '#90979c'
            },
            {
              type: 'inside',
              show: true,
              height: 15,
              start: 1,
              end: 35
            }
          ],
          series: me.series
        })
      }
    }
  }
</script>
