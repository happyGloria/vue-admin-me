<template>
	<div :id="id" class="chart-el"></div>
</template>
<script>
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/pie')
  require('echarts/lib/component/tooltip')

  var dataSet = [
    { key: 'normal', name: '正常', value: 0 },
    { key: 'fault', name: '异常', value: 0 }
  ]
	export default {
    name: 'pieChart',
		props: {
			id: {
				type: String,
				default: "main"
			},
			setting: {
				type: Object,
				default(){
					return {
          }
				}
      },
      pieData: Object
    },
		data() {
      var {
        temp
      } = this.setting
			return {
        option: {
					tooltip: {
						trigger: 'item',
						formatter: '统计数据:<br> {b}:  {c}  ({d}%)',
						position(point, params) {
							return [point[0] + 10, '40%']
						}
					},
          color: ['rgb(35,177,254)', 'rgb(254,86,96)'],
					series: [{
						name: '设备统计',
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['75%', '100%'],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: 'rgb(255, 255, 255)', 
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
						data: dataSet
					}]
				},
				chart: null
			}
    },
    methods: {
      getPieArr(data) {
        var itemData = {
          itemStyle: {
            borderWidth: 2
          }
        }
        if (data.fault == 0 && data.normal == 0) {
          Object.assign(itemData.itemStyle, {
            color: 'rgba(236, 236, 239, 1)',
            borderColor: 'rgba(255,255, 255, 0)'
          })
        }
        let arr = []
        dataSet.forEach(item => {
          var val = data[item.key]
          if (val == 0) {
            Object.assign(itemData.itemStyle, {
              borderColor: 'rgba(255,255, 255, 0)',
            })
          }
          arr.push(Object.assign(item, { value: val }, itemData))
        })
				return arr
      },
      setData() {
        var pieData = this.getPieArr(this.pieData)
        this.option = Object.assign({}, this.option, {
          series: [{
            data: pieData
          }]
        })
        this.chart.setOption(this.option)
      }
    },
		mounted() {
			this.chart = echarts.init(this.$el)
      this.chart.setOption(this.option)
      
      this.setData()

      this.chart.on('click', (param, i, txt, url) => {
        this.$emit('pieClick', param)
      })
		}
	}
</script>
<style lang="less">
  @import "~@/less/mixin.less";
	.chart-el{
		width: 100%;
    height: 100%;
    .x-y-center-parent();
	}
</style>