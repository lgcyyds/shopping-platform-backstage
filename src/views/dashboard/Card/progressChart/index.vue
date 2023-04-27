<template>
    <div class="charts" ref="progressChart" style="width: 270px; height: 40px;"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    mounted() {
        var myChart = echarts.init(this.$refs.progressChart);
        myChart.setOption({
            xAxis: {
                show: false,
                max:100,
                min:0
            },
            yAxis: {
                show: false,
                type:"category"
            },
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [78],
                    barWidth:7,
                    showBackground:true,
                    color:"cyan",
                    label:{
                        show:true,
                        formatter:"|",
                        position:"right"
                    }
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