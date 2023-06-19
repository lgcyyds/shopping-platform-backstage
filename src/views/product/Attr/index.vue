<template>
    <div>
        <el-card style="margin-bottom: 10px;">
            <CategorySelect @categoryId="getCategoryId" :isShowCard="isShowCard"></CategorySelect>
        </el-card>
        <!-- 属性展示区 -->
        <div v-show="isShowCard">
            <el-card>
                <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="!categoryId.category3Id"
                    @click="addAttrValue">添加属性</el-button>
                <el-table border style="margin-top: 10px;" :data="AttrInfoList">
                    <el-table-column label="序号" width="100px" align="center" type="index"></el-table-column>
                    <el-table-column label="属性名称" width="200px" prop="attrName"></el-table-column>
                    <el-table-column label="属性值列表" prop="prop">
                        <template slot-scope="{row}">
                            <el-tag type="success" v-for="attrValue in row.attrValueList" :key="attrValue.id"
                                style="margin: 5px 20px;">{{ attrValue.valueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200px">
                        <template slot-scope="{row}">
                            <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
        <!-- 属性修改和删除 -->
        <div v-show="!isShowCard">
            <el-card>
                <el-form :inline="true">
                    <el-form-item label="属性名">
                        <el-input placeholder="请输入属性名" v-model="AttrInfo.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" icon="el-icon-plus" @click="addAttrName"
                    :disabled="AttrInfo.attrName == ''">添加属性值</el-button>
                <el-button>取消</el-button>
                <el-table border style="margin: 20px 0px;" :data="AttrInfo.attrValueList">
                    <el-table-column type="index" label="序号" width="100px"></el-table-column>
                    <el-table-column label="属性值名称" width="600px">
                        <template slot-scope="{row,$index}">
                            <el-input placeholder="请输入属性值" size="mini" v-model="row.valueName" v-if="row.showInput"
                                @blur="toLook(row)" :ref="$index"></el-input>
                            <span v-else :ref="$index" @click="toInput(row, $index)" style="display: block;">{{
                                row.valueName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="{row,$index}">
                            <el-button type="warning" icon="el-icon-edit" size="mini"
                                @click="editAttrValue(row)"></el-button>
                            <el-popconfirm title="确定删除吗？"  @onConfirm="deleteAttrValue($index)">
                                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"></el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="addOrUpdate" :disabled="AttrInfo.attrValueList.length<1">保存</el-button>
                <el-button @click="isShowCard = true">取消</el-button>
            </el-card>
        </div>

    </div>
</template>
<script>
//按需引入lodash的深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
    name: 'Attr',
    data() {
        return {
            isShowCard: true,
            categoryId: {},
            AttrInfoList: [],
            AttrInfo: {
                "attrName": "",
                "attrValueList": [],
                "categoryId": 0,
                "categoryLevel": 3,
            }
        }
    },
    methods: {
        //获取从三级菜单传过来的数据，然后发送请求获取表格中的属性数据
        getCategoryId(cForm) {
            this.categoryId = cForm
            this.getAttrInfoList()
        },
        //根据菜单数据然后发送请求获取表格中的属性数据
        async getAttrInfoList() {
            let result = await this.$API.attr.reqAttrInfoList(this.categoryId)
            if (result.code == 200) {
                console.log(result.data);

                this.AttrInfoList = result.data
            }
        },
        //添加属性按钮回调
        addAttrValue() {
            this.isShowCard = false
            this.AttrInfo = {
                "attrName": "",
                "attrValueList": [],
                "categoryId": this.categoryId.category3Id,
                "categoryLevel": 3,
            }
        },
        //添加属性值回调
        addAttrName() {
            this.AttrInfo.attrValueList.push({
                "attrId": this.AttrInfo.id,
                "valueName": "",
                showInput: true,
            })
            this.$nextTick(() => {
                this.$refs[this.AttrInfo.attrValueList.length - 1].focus()

            })
        },
        //取消
        editAttrValue(row) {

        },
        //修改属性
        updateAttr(row) {            
            this.isShowCard = false
            this.AttrInfo = cloneDeep(row)
            // 点击更改属性时，把数据带过去，但是带过去的属性没有showInput这个属性，直接加的话不是响应式数据
            // 所以用this.$set
            this.AttrInfo.attrValueList.forEach(item => {
                this.$set(item, 'showInput', false)
            })
        },
        //点击blur修改属性值后的回调
        toLook(row) {
            if (row.valueName.trim() == '') {
                this.$message.error('属性值不能为空！')
                return;
            }
            let isRepeat = this.AttrInfo.attrValueList.some(item => {
                if (row !== item) {
                    return row.valueName == item.valueName
                }
            })
            if (isRepeat) {
                this.$message.error('属性值不能重复！')
                return
            };
            row.showInput = false
        },
        //点击span转input
        toInput(row, index) {
            row.showInput = true
            this.$nextTick(() => {
                this.$refs[index].focus()
            })
        },
        //删除属性值
        deleteAttrValue(index){
            this.AttrInfo.attrValueList.splice(index,1)            
        },
        //按保存之后添加或者更新属性
        async addOrUpdate(){
            this.AttrInfo.attrValueList = this.AttrInfo.attrValueList.filter(item=>{
                if(item.valueName!=''){
                    delete item.showInput
                    return true
                }
            })
            try {
                await this.$API.attr.reqAddOrUpdateAttr(this.AttrInfo)
                this.isShowCard=true
                this.$message.success('保存成功！')
                this.getAttrInfoList()
            } catch (error) {
                this.$message.error('保存失败')
            }

        }
    },
}
</script>

<style></style>