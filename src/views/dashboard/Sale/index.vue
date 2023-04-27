<template>
    <el-card class="box-card">
        <div slot="header" class="boxHeader">
            <el-tabs class="header_tab" v-model="activeName">
                <el-tab-pane label="销售额" name="sale"></el-tab-pane>
                <el-tab-pane label="访问量" name="visit"></el-tab-pane>
            </el-tabs>
            <div class="header_date">
                <span @click="setDay">今日</span>
                <span @click="setWeek">本周</span>
                <span @click="setMonth">本月</span>
                <span @click="setYear">本年</span>
                <span class="block">
                    <el-date-picker v-model="date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
                        size="mini" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </span>
            </div>
        </div>
        <div>
            <el-row :gutter="10">
                <el-col :span="18">
                    <div ref="charts" style="width: 1000px;height:300px;"></div>
                </el-col>
                <el-col :span="6">
                    <h2>门店{{ title }}排名</h2>
                    <ul>
                        <li>
                            <span class="rindex">1</span>
                            <span>肯德基</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li>
                            <span class="rindex">2</span>
                            <span>肯德基</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li>
                            <span class="rindex">3</span>
                            <span>肯德基</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li>
                            <span>4</span>
                            <span>肯德基</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li>
                            <span>5</span>
                            <span>肯德基</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li>
                            <span>6</span>
                            <span>肯德基</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li>
                            <span>7</span>
                            <span>肯德基</span>
                            <span class="rvalue">123456</span>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script>
import * as echarts from 'echarts';
import dayjs from 'dayjs'
export default {
    mounted() {
        this.myChart = echarts.init(this.$refs.charts);
        // 绘制图表
        this.myChart.setOption({
            title: {
                text: '销售额趋势'
            },
            tooltip: {},
            xAxis: {
                data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
            },
            yAxis: {
                nameTextStyle:{
                    lineHeight:100
                }
                
            },
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 44, 20,56,22,46,29,66,47]
                }
            ],
            grid:{
                left:40,
                height:210
            }
        });
    },
    data() {
        return {
            activeName: "sale",
            myChart:null,
            date:[]
        }
    },
    computed:{
        title(){
            return this.activeName=='sale'?"销售额":"访问量"
        }
    },
    methods:{
        setDay(){
            const toDay=dayjs().format('YYYY-MM-DD')
            this.date=[toDay,toDay]
        },
        setWeek(){
            const weekStart = dayjs().day(1).format('YYYY-MM-DD')
            const weekEnd= dayjs().day(7).format('YYYY-MM-DD')
            this.date=[weekStart,weekEnd]
        },
        setMonth(){
            const monthStart = dayjs().startOf("month").format('YYYY-MM-DD')
            const monthEnd= dayjs().endOf("month").format('YYYY-MM-DD')
            this.date=[monthStart,monthEnd]
        },
        setYear(){
            const yearStart = dayjs().startOf("year").format('YYYY-MM-DD')
            const yearEnd= dayjs().endOf("year").format('YYYY-MM-DD')
            this.date=[yearStart,yearEnd]
        }
    },
    watch:{
        title(){
            this.myChart.setOption({
            title: {
                text:`${this.title}趋势`
            }});
        }
    }
}
</script>

<style scoped>
.el-date-editor>>>.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
    width: 250px;
}

.boxHeader {
    position: relative;
    display: flex;
    justify-content: space-between;
}

.header_tab {
    width: 100%;
}

.el-card>>>.el-card__header {
    border-bottom: none
}

.header_date span {
    margin-right: 15px;
    font-size: 13px;
}

.header_date {
    position: absolute;
    right: 0;
}
ul{
    list-style: none;
    width: 100%;
    height: 300px;
    padding-left:0px ;
}
ul li{
    height: 15%;
}
ul li span{
    margin: 0px 20px;
}
.rindex{
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: black;
    color:white;
    text-align: center;
}
.rvalue{
    float: right;
}
</style>