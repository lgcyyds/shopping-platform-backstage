<template>
    <div>
        <el-form label-width="80px" :model="spuData">
            <el-form-item label="SPU名称">
                <el-input placeholder="请输入SPU名称" v-model="spuData.spuName"></el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <el-select placeholder="请选择品牌" v-model="spuData.tmId">
                    <el-option :label="item.tmName" :value="item.id" v-for="item in tradeMarkList"
                        :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" rows="4" placeholder="描述" v-model="spuData.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU照片">
                <el-upload action="/dev-api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handlerSuccess"
                    :file-list="spuData.spuImageList || []">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-select :placeholder="`还有${unSelectSaleAttr.length}个未选择`" v-model="saleAttrIdAndName">
                    <el-option v-for="item in unSelectSaleAttr" :key="item.id" :label="item.name"
                        :value="`${item.id}:${item.name}`"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" :disabled="!saleAttrIdAndName"
                    @click="addSaleAttr">添加销售属性</el-button>
                <el-table border style="margin-bottom: 10px;" :data="spuData.spuSaleAttrList">
                    <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                    <el-table-column label="属性名" width="160px" prop="saleAttrName"></el-table-column>
                    <el-table-column label="属性值名称列表">
                        <template slot-scope="{row,$index}">
                            <el-tag :key="tag.id" v-for="tag, index in row.spuSaleAttrValueList" closable
                                :disable-transitions="false" @close="handleClose(row, index)">
                                {{ tag.saleAttrValueName }}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" size="small"
                                @keyup.enter.native="handleInputConfirm(row)" @blur="handleInputConfirm(row)" :ref="$index">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput(row, $index)">+
                                添加</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="160px">
                        <template slot-scope="{$index}">
                            <el-button type="danger" icon="el-icon-delete" @click="deleteAttr($index)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="addAndUpdateSpu">保存</el-button>
                <el-button @click="$emit('cancelSpu', {screen:0,flag:'修改'})">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            spuData: {//整理完最后发给服务器的数据
                "category3Id": 0,
                "description": "",
                "tmId": 0,
                "spuName": "",
                "spuImageList": [
                    // {
                    //     "id": 0,
                    //     "imgName": "",
                    //     "imgUrl": "",
                    //     "spuId": 0
                    // }
                ],
                "spuSaleAttrList": [
                    // {
                    //     "baseSaleAttrId": 0,
                    //     "id": 0,
                    //     "saleAttrName": "string",
                    //     "spuId": 0,
                    //     "spuSaleAttrValueList": [
                    //         {
                    //             "baseSaleAttrId": 0,
                    //             "id": 0,
                    //             "isChecked": "string",
                    //             "saleAttrName": "string",
                    //             "saleAttrValueName": "string",
                    //             "spuId": 0
                    //         }
                    //     ]
                    // }
                ],

            },
            tradeMarkList: [],//所有品牌信息
            spuImageList: [],//好像没用
            BaseSaleAttrList: [],//三个，尺寸颜色版本
            saleAttrIdAndName: '',//销售属性id和名称
            inputValue: ''
        }
    },
    methods: {
        //删除照片墙
        handleRemove(file, fileList) {
            this.spuData.spuImageList = fileList
        },
        //点击照片预览
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //上传成功的回调
        handlerSuccess(response, file, fileList) {
            this.spuData.spuImageList = fileList
        },
        // 初始化表单数据
        async initSpuData(row) {
            //获取spu单个数据
            let spuResult = await this.$API.spu.reqSpuData(row.id)
            if (spuResult.code == 200) {
                this.spuData = spuResult.data
            }
            //获取品牌信息
            let tradeResult = await this.$API.spu.reqTradeMarkList()
            if (tradeResult.code == 200) {
                this.tradeMarkList = tradeResult.data
            }
            //获取SPU图标的接口
            let imageResult = await this.$API.spu.reqSpuImageList(row.id)
            if (imageResult.code == 200) {
                let listArr = imageResult.data
                listArr.forEach(item => {
                    item.name = item.imgName
                    item.url = item.imgUrl
                })
                this.spuData.spuImageList = listArr
            }
            //获取平台全部销售属性
            let saleAttrResult = await this.$API.spu.reqBaseSaleAttrList()
            if (saleAttrResult.code == 200) {
                this.BaseSaleAttrList = saleAttrResult.data
            }
        },
        //删除属性值
        handleClose(row, index) {
            row.spuSaleAttrValueList.splice(index, 1)
        },
        deleteAttr(index) {
            this.spuData.spuSaleAttrList.splice(index, 1)
        },
        //展示输入框
        showInput(row, index) {
            //给row新增属性inputVisible
            this.$set(row, 'inputVisible', true)
            //给row新增属性用来接收input的值
            this.$set(row, 'inputValue', '')

            this.$nextTick(_ => {
                this.$refs[index].$refs.input.focus();
            });
        },
        // 点击外部修改属性值
        handleInputConfirm(row) {
            console.log(row);

            if (row.inputValue.trim() == '') {
                return
            }
            let flag = row.spuSaleAttrValueList.some(item => item.saleAttrValueName == row.inputValue)
            if (flag) {
                this.$message.error("输入重复！")
                return
            };
            let { baseSaleAttrId, inputValue } = row
            let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue }
            row.spuSaleAttrValueList.push(newSaleAttrValue)
            row.inputVisible = false;
            row.inputValue = '';
        },
        //点击添加销售属性
        addSaleAttr() {
            let [id, saleAttrName] = this.saleAttrIdAndName.split(':')
            let spuSaleAttr = { id, saleAttrName, spuSaleAttrValueList: [] }
            this.spuData.spuSaleAttrList.push(spuSaleAttr)
            //清空数据
            this.saleAttrIdAndName = ''
        },
        async addAndUpdateSpu() {
            this.spuData.spuImageList = this.spuData.spuImageList.map(item => {
                return {
                    imgName: item.name,
                    imgUrl: (item.response && item.response.data) || item.url,
                }
            })
            try {
                console.log(this.spuData);

                await this.$API.spu.reqAddOrUpdateSpu(this.spuData)
                this.$emit('cancelSpu', {screen:0,flag:this.spuData.id?"修改":"新增"})
                this.$message.success('保存成功！')
            } catch (error) {
                this.$message.error('保存失败！')
            }
        },
        async addSpuData(category3Id) {

            //获取品牌信息
            let tradeResult = await this.$API.spu.reqTradeMarkList()
            if (tradeResult.code == 200) {
                this.tradeMarkList = tradeResult.data
            }
            //获取平台全部销售属性
            let saleAttrResult = await this.$API.spu.reqBaseSaleAttrList()
            if (saleAttrResult.code == 200) {
                this.BaseSaleAttrList = saleAttrResult.data
            }
            this.spuData.category3Id=category3Id
        },
        removeData(){
            //清除数据
            // this._data
            // this.$options.data
            Object.assign(this._data,this.$options.data())
            console.log("调用了");
            
        }
    },

    computed: {
        // 计算有多少个属性没有被选
        unSelectSaleAttr() {
            return this.BaseSaleAttrList.filter(item => {
                return this.spuData.spuSaleAttrList.every(items => {
                    return items.saleAttrName != item.name
                })
            })

        }
    }

}
</script>

<style scoped>
.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>