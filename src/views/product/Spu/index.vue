<template>
    <div>
        <el-card style="margin-bottom: 10px;">
            <CategorySelect @categoryId="getCategoryId" :isShowCard="screen == 0"></CategorySelect>
        </el-card>
        <el-card style="width: 100%;">
            <div v-show="screen == 0">
                <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 10px;" size="mini"
                    @click="addSpu">添加SPU</el-button>
                <el-table border :data="spuList">
                    <el-table-column label="序号" type="index" width="100px" align="center"></el-table-column>
                    <el-table-column label="spu名称" prop="spuName"></el-table-column>
                    <el-table-column label="spu描述" prop="description"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="{row}">
                            <el-button type="success" icon="el-icon-plus" size="mini" @click="addSku(row)"></el-button>
                            <el-button type="warning" icon="el-icon-edit" size="mini" @click="editSpu(row)"></el-button>
                            <el-button type="info" icon="el-icon-warning-outline" size="mini" @click="handler(row)"
                                style="margin-right: 10px;"></el-button>
                            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination style="margin-top: 20px; text-align: center;" :total="total" :current-page="currentPage"
                    :page-size="limit" :page-sizes="[3, 5, 10]" layout=" prev, pager, next, jumper,->, sizes,total"
                    @current-change="getList" @size-change="changeSize"></el-pagination>
            </div>
            <spuForm v-show="screen == 1" @cancelSpu="cancelSpu" ref="Spu"></spuForm>
            <skuForm v-show="screen == 2" @cancelSku="cancelSku" ref="Sku"></skuForm>
        </el-card>
        <el-dialog :title="`${title}的spu信息`" :visible.sync="dialogTableVisible" :before-close="close">
            <el-table :data="skuList" v-loading="loading">
                <el-table-column  label="名称" prop="skuName"></el-table-column>
                <el-table-column  label="价格" prop="price"></el-table-column>
                <el-table-column  label="重量" prop="weight"></el-table-column>
                <el-table-column label="默认图片">
                    <template slot-scope="{row}">
                        <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px;">
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
import spuForm from './spuForm'
import skuForm from './skuForm'
export default {
    name: 'Spu',
    data() {
        return {
            screen: 0,
            CategoryId: {},
            currentPage: 1,
            total: 0,
            spuList: [],
            limit: 3,
            dialogTableVisible:false,
            skuList:[],
            title:'',
            loading: true
        }
    },
    mounted() {
        this.getSpuList()
    },
    methods: {
        // 将三级联动的数据传给接口
        getCategoryId(CategoryId) {
            this.CategoryId = CategoryId
            this.getSpuList()
        },
        // 获取展示spu
        async getSpuList() {
            let { currentPage, limit } = this
            let category3Id = this.CategoryId.category3Id
            let result = await this.$API.spu.reqSpuList(currentPage, limit, category3Id)
            if (result.code == 200) {
                console.log(result);

                this.currentPage = result.data.current
                this.spuList = result.data.records
                this.total = result.data.total
                this.limit = result.data.size
            }

        },
        //点击翻页
        getList(page) {
            this.currentPage = page
            this.getSpuList()
        },
        //点击修改展示条数
        changeSize(size) {
            this.limit = size
            this.getSpuList()
        },
        addSpu() {
            this.screen = 1
            this.$refs.Spu.removeData()
            this.$refs.Spu.addSpuData(this.CategoryId.category3Id)
        },
        editSpu(row) {
            this.screen = 1
            this.$refs.Spu.initSpuData(row)
        },
        cancelSpu({ screen, flag }) {
            this.screen = screen
            if (flag == "修改") {
                this.getSpuList(this.currentPage)
            } else {
                this.getSpuList(1)
            }

        },
        async deleteSpu(row) {
            let result = await this.$API.spu.reqDeleteSpu(row.id)
            if (result.code == 200) {
                this.$message.error("删除成功！")
                this.getSpuList()
            }
        },
        addSku(row) {
            this.screen = 2
            console.log(row, this.CategoryId);

            this.$refs.Sku.getData(row, this.CategoryId)

        },
        cancelSku(index) {
            this.screen = index
        },
        async handler(row){
            this.dialogTableVisible = true
            this.title=row.spuName
            let result = await this.$API.spu.reqSkuList(row.id)
            if(result.code==200){
                this.skuList=result.data
                this.loading=false
            }            
        },
        close(done){
            this.loading=true
            this.skuList=[]
            done()
        }
    },
    components: {
        spuForm,
        skuForm
    }
}
</script>

<style scoped></style>