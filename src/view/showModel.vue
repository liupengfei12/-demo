<template>
    <div>
        <div class="right_wrap">
            <div class="r_top">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="我的大屏" name="first"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="r_content">
                <div class="add_wrap" @click="onAddBtnclk">
                    <div class="a_w_w">
                        <i class="el-icon-circle-plus-outline"></i>
                        <p>新建大屏</p>
                    </div>
                </div>
                <div class="r_item_wrap" @mouseenter="onModelMouseEnter(item)" @mouseleave="onModelMouseLeave(item)"
                    :class="[item.isEdit ? 'is_old' : 'is_new']" v-for="(item, i) in modelList" :key="i">
                    <div v-if="item.isHover" class="model_edit">
                        <el-button type="primary" size="small" @click="onModelEdit(item)">编辑</el-button>
                    </div>
                    <div class="r_i_m">
                        <div style="font-size:0.16rem">
                            <div v-if="item.isChange">
                                <el-tooltip class="item" effect="dark" :content="item.title" placement="bottom">
                                    <p class="r_i_m_t">{{ item.title }}
                                    </p>
                                </el-tooltip>
                            </div>
                            <el-input @blur="onTitleSubmit(item)" @keyup.enter.native="onTitleSubmit(item)"
                                v-model="item.title" v-else size="mini"></el-input>
                        </div>
                        <div class="r_i_m_b">
                            <el-tooltip class="item" effect="dark" content="编辑名称" placement="bottom">
                                <img @click="onEditTitle(item)" src="../assets/edit.png" alt="">
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                                <i @click="onModelDelete(item)" class="el-icon-delete"></i>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="预览" placement="bottom">
                                <img src="../assets/see_more.png" alt="">
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="复制" placement="bottom">
                                <img src="../assets/copy.png" alt="">
                            </el-tooltip>

                        </div>
                    </div>
                </div>
            </div>
            <pagenation-vue @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="pageParams.page" :page-sizes="[20, 50, 100, 200]" :page-size="pageParams.limit"
                layout="total, sizes, prev, pager, next, jumper" :total="totals"></pagenation-vue>
        </div>
        <tsDialogVue :before-close="onAddDailogBeforeClose" title="新建大屏" :visible.sync="dialogVisible"
            @onCancel="onCancel" @onSubmit="onSubmit" width="30%">
            <el-form :model="addForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="大屏尺寸：">
                    <el-col :span="6">
                        <el-form-item prop="width">
                            <el-input-number disabled v-model="addForm.width" :min="1" label="请输入" :controls="false">
                            </el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1">-</el-col>
                    <el-col :span="7">
                        <el-form-item prop="height">
                            <el-input-number disabled v-model="addForm.height" :min="1" label="请输入" :controls="false">
                            </el-input-number>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="大屏名称" prop="title">
                    <el-input style="width:3rem" v-model="addForm.title" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
        </tsDialogVue>
    </div>
</template>

<script>
import pagenationVue from '../components/pagenation.vue';
import tsDialogVue from '../components/ts-dialog.vue';
export default {
    data() {
        return {
            activeName: 'first',
            pageParams: {
                page: 1,
                limit: 20
            },
            totals: 400,
            dialogVisible: false,
            addForm: {
                width: 1920,
                height: 1080,
                title: ''
            },
            rules: {
                width: [{ required: true, message: '请输入宽度', trigger: 'blur' }],
                height: [{ required: true, message: '请输入高度', trigger: 'blur' }],
                title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
            },
            modelList: []
        }
    },
    methods: {
        handleSizeChange(size) {
            this.pageParams.limit = size;
        },
        handleCurrentChange(page) {
            this.pageParams.page = page;
        },
        onAddBtnclk() {
            this.dialogVisible = true;
        },
        // 新增弹窗关闭之前
        onAddDailogBeforeClose(done) {
            this.addForm = {
                width: 1920,
                height: 1080,
                title: ''
            }
            this.$refs.ruleForm.clearValidate()
            done()
        },
        // 弹框关闭
        onCancel() {
            this.addForm = {
                width: 1920,
                height: 1080,
                title: ''
            }
            this.$refs.ruleForm.clearValidate()
            this.dialogVisible = false;
        },
        // 新增确定
        onSubmit() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.$router.push({ name: 'edit', query: this.addForm })
                }
            });
        },
        // 编辑标题
        onEditTitle(list) {
            if (list.isChange) {
                list.isChange = false;
            }
            console.log(list);
        },
        // 标题编辑确定
        onTitleSubmit(item) {
            console.log(123);
            item.isChange = true
        },
        // 模块编辑
        onModelEdit(list) { },
        // 鼠标滑过 
        onModelMouseEnter(item) {
            item.isHover = true
        },
        // 鼠标离开
        onModelMouseLeave(item) {
            item.isHover = false;
        },
        // 模块删除
        onModelDelete(item) {
            this.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                customClass: 'confirms'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
    },
    mounted() {
        for (let z = 0; z < 20; z++) {
            this.modelList.push({
                title: '这是第' + z + '个大屏',
                isEdit: false,
                isChange: true,
                isHover: false
            })
        }
    },
    components: {
        pagenationVue,
        tsDialogVue
    }
}
</script>

<style scoped>
.right_wrap {
    background-color: rgba(29, 29, 29, 0.94);
    height: 100%;
    width: 100%;
}

.r_top {
    height: 0.56rem;
    padding: 0 0.24rem;
    font-size: 0.42rem;
}

.r_top>>>.el-tabs__header {
    margin: 0;
}

.r_top>>>.el-tabs__nav-wrap::after {
    background-color: transparent;
}

.r_content {
    padding: 0.3rem 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: calc(100% - 2rem);
    overflow: auto;
}

/* 设置滚动条的样式 */

.r_content::-webkit-scrollbar {
    width: 6px;
}

/* 滚动槽 */

.r_content::-webkit-scrollbar-track {
    /* -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3); */
    border-radius: 10px;
}

/* 滚动条滑块 */

.r_content::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #fff;
    /* background: rgba(0, 0, 0, 0.1); */
    /* -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5); */

}

.add_wrap,
.r_item_wrap {
    width: 3.98rem;
    height: 2.7rem;
    margin-left: 0.24rem;
    margin-bottom: 0.24rem;
}

.add_wrap {
    background-image: linear-gradient(180deg, rgba(10, 132, 255, 0.13) 0%, rgba(10, 132, 255, 0.45) 100%);
    border: 2px solid;
    border-color: #0a84ff;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.a_w_w {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.a_w_w i {
    font-size: 0.4rem;
}

.a_w_w p {
    font-size: 0.16rem;
    margin-top: 0.14rem;
}

.r_item_wrap {
    border: 1px solid;
    border-color: #747480;
    border-radius: 3px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
}



.r_i_m {
    height: 0.46rem;
    background-color: rgba(33, 49, 67, 0.9);
    border-radius: 0px 0px 2px 2px;
    width: -webkit-fill-available;
    bottom: 0;
    left: 0;
    position: absolute;
    padding: 0 0.13rem;
    display: flex;
    align-items: center;
    z-index: 11;
    /* justify-content: ; */
}

.r_i_m_t {
    color: #ffffff;
    font-size: 14px;
    width: 1.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.r_i_m_b {
    color: #fff;
    font-size: 0.24rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.r_i_m_b i {
    cursor: pointer;
}

.r_i_m_b img {
    height: 0.2rem;
    width: 0.2rem;
    cursor: pointer;
}

.demo-ruleForm>>>.el-input-number {
    width: 1rem;
}

.demo-ruleForm>>>.el-form-item__label {
    color: #fff;
}

.demo-ruleForm>>>.el-input__inner {
    background-color: rgba(0, 0, 0, 0.9);
    border: 0.5px solid;
    border-color: rgba(84, 84, 88, 0.65);
    border-radius: 5px;
    color: #fff;
}

.demo-ruleForm>>>.is-disabled .el-input__inner {
    background-color: #1c1c1e !important;
}

.model_edit {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(39, 47, 62, 0.8);
    z-index: 10;
}

.is_new {
    background-image: url('../assets/new_model.png');
    background-size: 63px 72px;
    background-position: center center;
    background-color: rgba(0, 21, 41, 0.94);
    ;
}

.is_old {
    background-image: url('../assets/some_img.png');
}

.confirms>>>.el-message-box__title {
    /* height: 0.64rem !important; */
    color: #ccc !important;
}
</style>