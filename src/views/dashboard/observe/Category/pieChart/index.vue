<template>
    <div ref="piechart" style="width: 600px;height:293px;"></div>
</template>
<script>
import * as echarts from 'echarts';
export default {
    data() {
        return {
        }
    },
    mounted() {
        const myChart = echarts.init(this.$refs.piechart);
        // 绘制图表
        myChart.setOption({
            title: {
                text: '视频',
                subtext: 1048,
                left: 'center',
                top: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                        position: 'outside'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: true
                    },
                    data: [
                        { value: 1048, name: '视频' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ],
                    grid:{
                        top:-50
                    }

                }
            ]
        });
        myChart.on('mouseover', function (params) {
            const {name,value}=params.data
            myChart.setOption({
                title: {
                    text: name,
                    subtext: value,
                },
            })
            
        });
    },
}
</script>

<style></style>