<template>
    <div>
        <el-table border :data="skuList">
            <el-table-column type="index" label="序号" width="80px"></el-table-column>
            <el-table-column label="名称" prop="skuName"></el-table-column>
            <el-table-column label="描述" prop="skuDesc"></el-table-column>
            <el-table-column label="默认图片" width="110">
                <template slot-scope="{row}">
                    <img :src="row.skuDefaultImg" style="width: 80px; height: 80px;">
                </template>
            </el-table-column>
            <el-table-column label="重量(KG)" width="80" prop="weight"></el-table-column>
            <el-table-column label="价格(元)" width="80" prop="price"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="{row}">
                    <el-button type="success" icon="el-icon-sort-down" size="mini" v-if="row.isSale == 0"
                        @click="sale(row)"></el-button>
                    <el-button type="success" icon="el-icon-sort-up" size="mini" v-else @click="cancel(row)"></el-button>
                    <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                    <el-button type="info" icon="el-icon-info" size="mini" @click="showDraw(row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :total="99" :current-page="1" :page-size="10" :page-sizes="[3, 5, 10]" @current-change="changePage"
            @size-change="changeSize" layout=" prev, pager, next, jumper,->, sizes,total" style="text-align: center;">
        </el-pagination>
        <!-- 抽屉 -->
        <el-drawer :visible.sync="show" :show-close=false size="50%">
            <el-row>
                <el-col :span="5">名称</el-col>
                <el-col :span="16">{{ skuByIdList.skuName }}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">描述</el-col>
                <el-col :span="16">{{ skuByIdList.skuDesc }}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">价格</el-col>
                <el-col :span="16">{{ skuByIdList.price }}元</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">平台属性</el-col>
                <el-col :span="16">
                    <el-tag style="margin: 5px 5px;" v-for="item in skuByIdList.skuAttrValueList" :key="item.id">{{
                        item.attrName }}--{{ item.valueName }}</el-tag>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">商品图片</el-col>
                <el-col :span="16">
                    <el-carousel height="400px">
                        <el-carousel-item v-for="item in skuByIdList.skuImageList" :key="item.id">
                            <img :src="item.imgUrl" alt="" style="width: 500px; height: 400px;">
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
        </el-drawer>
    </div>
</template>
<script>
export default {
    name: 'Sku',
    data() {
        return {
            total: '',
            limit: 5,
            currentPage: 1,
            pageSize: 5,
            skuList: [],
            show: false,
            skuByIdList: {}
        }
    },
    mounted() {
        this.getSkuList()
    },
    methods: {
        async getSkuList() {
            const result = await this.$API.sku.reqSkuList(this.currentPage, this.limit)
            if (result.code == 200) {
                this.skuList = result.data.records
            }

        },
        changePage(page) {
            this.currentPage = page
            this.getSkuList()
        },
        changeSize(limit) {
            this.limit = limit
            this.getSkuList()
        },
        async sale(row) {
            const result = await this.$API.sku.reqOnSale(row.id)
            if (result.code == 200) {
                row.isSale = 1
                this.$message.success("上架成功")
            }
        },
        async cancel(row) {
            const result = await this.$API.sku.reqCancelSale(row.id)
            if (result.code == 200) {
                row.isSale = 0
                this.$message.success("下架成功")
            }
        },
        async showDraw(row) {
            const result = await this.$API.sku.reqSkuById(row.id)
            if (result.code == 200) {
                this.skuByIdList = result.data
            }
            this.show = true
        }
    }
}
</script>
<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>
<style scoped>
.el-row .el-col-5 {
    font-size: 18px;
    text-align: right;
}

.el-row .el-col-16 {
    font-size: 15px;
}

.el-col {
    margin: 10px 10px;
}
</style>