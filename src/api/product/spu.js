import request from '@/utils/request'
//获取spu每一页的数据
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })
//获取spu单个数据、
export const reqSpuData = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })
//获取品牌信息
export const reqTradeMarkList = () => request({ url: `/admin/product/baseTrademark/getTrademarkList`, method: 'get' })
//获取SPU图标的接口
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
//获取平台全部销售属性-----整个平台销售属性一共三个
export const reqBaseSaleAttrList = () => request({ url: `/admin/product/baseSaleAttrList`, method: 'get' })
//修改和添加Spu
export const reqAddOrUpdateSpu = (spuInfo) => {
    if (spuInfo.id) {
        request({ url: `/admin/product/updateSpuInfo`, method: 'post', data: spuInfo })
    } else {
        request({ url: `/admin/product/saveSpuInfo`, method: 'post', data: spuInfo })
    }
}
//删除spu
export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })
//获取spu销售属性
export const reqSpuSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })
//获取平台属性的数据
export const reqAttrInfoList=(category)=>{
    let {category1Id,category2Id,category3Id} = category
    return request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})
}
export const reqSaveSkuList=(skuInfo)=>request({url:`/admin/product/saveSkuInfo`,method:'post',data:skuInfo})

export const reqSkuList=(spuId)=>request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})