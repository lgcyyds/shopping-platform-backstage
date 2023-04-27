<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>线上热门搜索</span>
                <span style="float: right; padding: 3px 0; font-size: 20px;">···</span>
            </div>
            <div>
                <el-row :gutter="5">
                    <el-col :span="12">
                        <searchLineChart></searchLineChart>
                    </el-col>
                    <el-col :span="12">
                        <searchLineChart></searchLineChart>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-table :data="tableData" border>
                  <el-table-column label="排名" type="index" width="80px" align="center"></el-table-column>
                  <el-table-column label="搜索关键字"></el-table-column>
                  <el-table-column label="用户名" sortable></el-table-column>
                  <el-table-column label="周涨幅" sortable></el-table-column>
                </el-table>
                <el-pagination class="pagination" :total="12" :current-page="1" :page-size="1"  layout="prev, pager, next"></el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import searchLineChart from './searchLineChart'
export default {
    data(){
        return{
            tableData:[]
        }
    },
    components:{
        searchLineChart,
    }
}
</script>

<style scoped>
.el-card>>>.el-card__header {
    padding-bottom: 5px;
}

.clearfix span {
    font-size: 15px;
}
.pagination{
    text-align: center;
}
</style>