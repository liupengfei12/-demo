<template>
    <div class="right_wrap">
        <div class="r_top">
            <el-tabs v-model="activeName">
                <el-tab-pane label="我的大屏" name="first"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="r_content">
            <div class="r_item_wrap" :class="[item.isEdit ? 'is_old' : 'is_new']" v-for="(item, i) in modelList"
                :key="i">
                <div class="r_i_m">
                    <div style="font-size:0.16rem">
                        <div>
                            <el-tooltip class="item" effect="dark" :content="item.title" placement="bottom">
                                <p class="r_i_m_t">{{ item.title }}
                                </p>
                            </el-tooltip>
                        </div>
                    </div>
                    <div class="r_i_m_b">
                        <el-tooltip class="item" effect="dark" content="恢复" placement="bottom">
                            <img @click="onRecovery(item)" src="../assets/recovery.png" alt="">
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                            <i @click="onModelDelete(item)" class="el-icon-delete"></i>
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </div>
        <pagenation-vue @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pageParams.page" :page-sizes="[20, 50, 100, 200]" :page-size="pageParams.limit"
            layout="total, sizes, prev, pager, next, jumper" :total="totals"></pagenation-vue>
    </div>
</template>

<script>
import pagenationVue from '../components/pagenation.vue';
export default {
    data() {
        return {
            activeName: 'first',
            pageParams: {
                page: 1,
                limit: 20
            },
            modelList: [],
            totals: 400,
            dialogVisible: false,
            addForm: {
                width: 1920,
                height: 1080,
                title: ''
            },
        }
    },
    methods: {
        handleSizeChange(size) {
            this.pageParams.limit = size;
        },
        handleCurrentChange(page) {
            this.pageParams.page = page;
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
        // 恢复
        onRecovery(item){}
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
    width: 2.4rem;
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
</style>