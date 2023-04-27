<template>
    <div class="charts" ref="barChart" style="width: 270px; height: 40px;"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    mounted() {
        var myChart = echarts.init(this.$refs.barChart);
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
                    type: 'bar',
                    data: [32, 20, 36,34,55,33,65,46,23,74,11],
                    
                },

            ],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 5,
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