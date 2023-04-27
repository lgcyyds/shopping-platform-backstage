<template>
    <div>
        <el-form :inline="true" label-width="80px" class="demo-form-inline" :disabled="!isShowCard">
            <el-form-item label="一级分类">
                <el-select placeholder="请选择" v-model="cForm.category1Id" @change="getCategory2List">
                    <el-option :label="category1.name" v-for="category1 in category1List" :key="category1.id"
                        :value="category1.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select placeholder="请选择" v-model="cForm.category2Id" @change="getCategory3List">
                    <el-option :label="category2.name" v-for="category2 in category2List" :key="category2.id"
                        :value="category2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select placeholder="请选择" v-model="cForm.category3Id" @change="$emit('categoryId',cForm)">
                    <el-option :label="category3.name" v-for="category3 in category3List" :key="category3.id"
                        :value="category3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'CategorySelect',
    props:['isShowCard'],
    data() {
        return {
            category1List: [],
            category2List: [],
            category3List: [],
            cForm: {
                category1Id: '',
                category2Id: '',
                category3Id: '',
            },
            flag:false
        }
    },
    mounted() {
        this.getCategory1List()
    },
    methods: {
        async getCategory1List() {
            const result = await this.$API.attr.reqCategory1List()
            if (result.code == 200) {
                this.category1List = result.data
            }
            
        },
        async getCategory2List() {
            this.category2List=[],
            this.category3List=[],
            this.cForm.category2Id = ''
            this.cForm.category3Id = ''
            const result = await this.$API.attr.reqCategory2List(this.cForm.category1Id)
            if (result.code == 200) {
                this.category2List = result.data

            }
        },
        async getCategory3List() {
            this.category3List=[],
            this.cForm.category3Id = ''
            const result = await this.$API.attr.reqCategory3List(this.cForm.category2Id)
            if (result.code == 200) {
                this.category3List = result.data

            }
        },
    }
}
</script>

<style></style>