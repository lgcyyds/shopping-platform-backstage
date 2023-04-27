<template>
    <div>
        <el-button type="primary" icon="el-icon-plus" style="margin: 10px;" @click="addMark">添加</el-button>
        <!-- 表格 -->
        <el-table style="width: 100%;" border :data="List">
            <el-table-column type=index label="序号" align="center" width="80px"></el-table-column>
            <el-table-column prop="tmName" label="品牌名称"></el-table-column>
            <el-table-column prop="logoUrl" label="品牌LOGO">
                <template slot-scope="{row}">
                    <img :src="row.logoUrl" style="width: 100px; height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="{row}">
                    <el-button type="warning" icon="el-icon-edit" size="mini" @click="editMark(row)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteMark(row)">删除</el-button>
                </template>

            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination style="margin-top: 20px; text-align: center;" :total="total" :current-page="pageNo"
            :page-size="limit" :page-sizes="[3, 5, 10]" layout=" prev, pager, next, jumper,->, sizes,total"
            @current-change="getList" @size-change="changeSize">
        </el-pagination>
        <!-- 弹出框 -->
        <el-dialog :title="this.tmForm.id ? '编辑品牌信息' : '添加品牌信息'" :visible.sync="dialogFormVisible">

            <el-form style="width: 80%;" :rules="rules" ref="ruleForm" :model="tmForm">
                <!-- 品牌名称 -->
                <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                    <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
                </el-form-item>
                <!-- 品牌LOGO -->
                <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                    <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'tradeMark',
    data() {
        return {
            List: [],
            pageNo: 1,
            limit: 3,
            total: 0,
            dialogFormVisible: false,
            tmForm: {
                logoUrl: '',
                tmName: ''
            },
            rules: {
                tmName: [
                    { required: true, message: '请输入品牌名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
                ],
                logoUrl: [
                    { required: true, message: '请选择图片' }
                ]
            }
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        // 获取一页数据
        async getList(page = 1) {

            let { pageNo, limit } = this
            pageNo = page
            let result = await this.$API.tradeMark.reqTradeMark(pageNo, limit)

            if (result.code == 200) {
                this.List = result.data.records
                this.total = result.data.total
                this.pageNo = result.data.current
                this.limit = result.data.size
            }

        },
        // 改变一页显示的条数
        changeSize(limit) {
            this.limit = limit
            this.getList()
        },
        // 添加品牌
        addMark() {
            this.dialogFormVisible = true
            this.tmForm = {
                logoUrl: '',
                tmName: ''
            }
        },
        editMark(row) {
            this.dialogFormVisible = true
            this.tmForm = { ...row }
        },
        //上传图片相关的回调
        handleAvatarSuccess(res, file) {
            this.tmForm.logoUrl = res.data
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        addOrUpdateTradeMark() {
            this.$refs.ruleForm.validate(async (valid) => {
                // 表单验证
                if (valid) {
                    this.dialogFormVisible = false
                    const result = await this.$API.tradeMark.reqAddOrUpdateTradeMark(this.tmForm)
                    if (result.code == 200) {
                        this.$message.success(this.tmForm.id ? "修改品牌成功" : "添加品牌成功")
                        this.getList(this.tmForm.id ? this.pageNo : 1)
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        deleteMark(row) {
            this.$confirm('确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const result = await this.$API.tradeMark.reqDeleteTradeList(row.id)
                if (result.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getList(this.pageNo)
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        }
    }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>