<template>
    <div>
        <el-card class="box-card">
            <div slot="header">
                <div class="category_header">
                    <span>销售额类别占比</span>
                    <el-radio-group v-model="value">
                        <el-radio-button label="全部渠道"> </el-radio-button>
                        <el-radio-button label="线上"></el-radio-button>
                        <el-radio-button label="门店"></el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="footer">
                <piechart></piechart>
            </div>
        </el-card>
    </div>
</template>

<script>
import piechart from './pieChart'
export default {
    data() {
        return {
            value: '全部渠道'
        }
    },
    components:{
        piechart
    }
}
</script>

<style scoped>
.category_header span {
    font-size: 15px;
}

.category_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.el-card>>>.el-card__header {
    padding: 6px 20px;
}
</style>