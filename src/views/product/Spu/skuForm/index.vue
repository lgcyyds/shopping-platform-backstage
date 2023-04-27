<template>
  <div>
    <el-form label-width="80px" style="margin-left: 20px;" :model="skuInfo">
      <el-form-item label="SPU名称">{{ spuName }}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" v-model="skuInfo.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" placeholder="规格描述" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form inline label-width="80px">
          <el-form-item :label="item.attrName" v-for="item in AttrInfoList" :key="item.id">
            <el-select :placeholder="`请选择${item.attrName}`" v-model="item.attrIdAndValueId">
              <el-option :label="itemValue.valueName" :value="`${item.id}:${itemValue.id}`"
                v-for="itemValue in item.attrValueList" :key="itemValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form label-width="80px" inline>
          <el-form-item :label="item.saleAttrName" v-for="item in spuSaleAttrList" :key="item.id">
            <el-select placeholder="请选择" v-model="item.attrIdAndValueId">
              <el-option :label="SaleAttrValue.saleAttrValueName" :value="`${item.id}:${SaleAttrValue.id}`"
                v-for="SaleAttrValue in item.spuSaleAttrValueList" :key="SaleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table border :data="ImageList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="60px" align="center"></el-table-column>
          <el-table-column label="图片">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" style="width: 100px; height: 100px;">
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <el-button type="primary" @click="changeDefault(row)" v-if="row.isDefault == 0">设为默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSkuList">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { listenerCount } from 'process'

export default {
  data() {
    return {
      spuName: '',
      ImageList: [],
      spuSaleAttrList: [],
      AttrInfoList: [],
      ImageListTemp: [],
      skuInfo: {
        "category3Id": 0,
        "price": 0,
        "spuId": 0,
        "tmId": 0,
        "skuDefaultImg": "",
        "skuDesc": "",
        "skuName": "",
        "skuAttrValueList": [],
        "skuImageList": [],
        "skuSaleAttrValueList": [],
        "weight": 0
      }
    }
  },
  methods: {
    async getData(row, CategoryId) {
      let { tmId, id, category3Id, spuName } = row
      this.spuName = spuName
      this.skuInfo.tmId = tmId
      this.skuInfo.spuId = id
      this.skuInfo.category3Id = category3Id

      const result1 = await this.$API.spu.reqSpuImageList(row.id)
      if (result1.code == 200) {
        console.log(result1);

        let list = result1.data
        list.forEach(item => {
          item.isDefault = 0
        })
        this.ImageList = list

      }
      const result2 = await this.$API.spu.reqSpuSaleAttrList(row.id)
      if (result2.code == 200) {
        this.spuSaleAttrList = result2.data
      }
      const result3 = await this.$API.spu.reqAttrInfoList(CategoryId)
      if (result3.code == 200) {
        this.AttrInfoList = result3.data
      }
    },
    changeDefault(row) {
      this.ImageList.forEach(item => {
        item.isDefault = 0
      })
      row.isDefault = 1
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    handleSelectionChange(params) {
      this.ImageListTemp = params
      console.log(params);

    },
    cancel() {
      this.$emit('cancelSku', 0)
      Object.assign(this._data, this.$options.data())
    },
    async saveSkuList() {
      //整理平台属性的操作
      this.skuInfo.skuAttrValueList = this.AttrInfoList.reduce((pre, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(':')
          pre.push({ attrId, valueId })
        }
        return pre
      }, [])
      //整理销售属性
      this.skuInfo.skuSaleAttrValueList = this.spuSaleAttrList.reduce((pre, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(':')
          pre.push({ attrId, valueId })
        }
        return pre
      }, [])

      //整理图片
      this.skuInfo.skuImageList = this.ImageListTemp.map(item => {
        return {
          "imgName": item.imgName,
          "imgUrl": item.imgUrl,
          "isDefault": item.isDefault,
          "spuImgId": item.id
        }
      })
      let result = await this.$API.spu.reqSaveSkuList(this.skuInfo)      
      if(result.code==200){
        this.$message.success("保存成功！")
        this.$emit('cancelSku',0)
        Object.assign(this._data, this.$options.data())
      }
    }

  }
}
</script>

<style></style>