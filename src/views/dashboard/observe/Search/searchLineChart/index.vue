<template>
    <div>
        <div class="header">
            <span class="search_header">搜索用户数</span>
            <svg t="1680690710519" class="icon1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="2759" width="16" height="16">
                <path
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                    p-id="2760"></path>
                <path d="M512 336m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z" p-id="2761"></path>
                <path d="M536 448h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"
                    p-id="2762"></path>
            </svg>
        </div>
        <div class="main">
            <span class="main_title">12321</span>
            <span class="main_content">17.3</span>
            <svg t="1680691181968" class="icon2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="5898" width="16" height="16">
                <path d="M512 938.666667L262.4 640h499.2z" fill="#d81e06" p-id="5899"></path>
                <path d="M426.666667 128h170.666666v576h-170.666666z" fill="#d81e06" p-id="5900"></path>
            </svg>
            <svg t="1680691239094" class="icon2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="10265" width="16" height="16">
                <path d="M512 85.333333l249.6 298.666667H262.4z" fill="#1afa29" p-id="10266"></path>
                <path d="M426.666667 320h170.666666v576h-170.666666z" fill="#1afa29" p-id="10267"></path>
            </svg>
        </div>
        <div class="foooter">
            <div ref="charts" style="width: 300px;height:90px;"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    mounted() {
        var myChart = echarts.init(this.$refs.charts);
        // 绘制图表
        myChart.setOption({
            xAxis: {
                show: false,
                type: "category"
            },
            yAxis: {
                show: false
            },
            series: [
                {
                    name: '销量',
                    type: 'line',
                    data: [32, 20, 36, 10, 67, 20, 45, 22, 43],
                    itemStyle: {
                        opacity: 0
                    },
                    lineStyle: {
                        color: "blue",
                        smooth: true
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'blue' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#fff' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },

                    },
                    smooth: true
                },

            ],
            grid: {
                left:-15,
                top: 0,
                right: 0,
                bottom: 0,
                height: 77
            }

        });
    }
}
</script>

<style scoped>
.search_header {
    font-size: 15px;
}

.icon1 {
    margin: -3px 10px;
}

.icon2 {
    margin: -3px 0px;
}

.main {
    margin: 10px 0px;
}

.main_title {
    margin-right: 30px;

}

.main_content {
    margin-right: 10px;
}</style>