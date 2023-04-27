<template>
    <div class="charts" ref="lineChart" style="width: 270px; height: 40px;"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    mounted() {
        var myChart = echarts.init(this.$refs.lineChart);
        myChart.setOption({
            xAxis: {
                show: false,
                type:"category"
            },
            yAxis: {
                show: false
            },
            series: [
                {
                    name: '销量',
                    type: 'line',
                    data: [32, 20, 36, 10, 67, 20,45,22,43],
                    itemStyle: {
                        opacity: 0
                    },
                    lineStyle: {
                        color: "#e32ab6",
                        smooth:true
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#e32ab6' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#fff' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },

                    },
                    smooth:true
                },

            ],
            grid: {
                left: -27,
                top: 0,
                right: 0,
                bottom: 0,
                width:400
            }

        });
    }
}
</script>

<style scoped>
.charts {
    width: 100%;
    height: 100%;
}
</style>