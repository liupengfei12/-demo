<template>
    <div class="wraps">
        <el-row>
            <el-col :span="11">
                <div class="titles">
                    大屏编辑器
                </div>
            </el-col>
            <el-col :span="6">
                <div class="l_r">
                    <img src="../assets/left.png" alt="">
                    <img style="margin-left:0.3rem" src="../assets/right.png" alt="">
                </div>
            </el-col>
            <el-col :span="2">
                <div class="set_color">
                    <span>背景颜色</span>
                    <el-color-picker class="colorPicker" @change="onColorChange" size="mini"
                        v-model="backgroundColor"></el-color-picker>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="grid_wrap">
                    <span>布局</span>
                    <div class="grid_box">
                        <el-popover popper-class="popover_class" placement="bottom" width="150" trigger="click">
                            <div class="grid_item_box">
                                <div v-for="item in layoutList" :key="item.id" @click="onLayoutClk(item)"
                                    :style="{ backgroundImage: 'url(' + (activeIndex == item.id ? item.activeImg : item.img) + ')' }">
                                </div>
                            </div>
                            <img slot="reference" src="../assets/grid.png" alt="">
                        </el-popover>
                    </div>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="btn_wrap">
                    <el-button type="info" size="mini" @click="">预览</el-button>
                    <el-button type="primary" size="mini" @click="">保存</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            backgroundColor: '#000000',
            layoutList: [
                {
                    title: '默认',
                    id: 1,
                    img: require('../assets/grid_1.png'),
                    activeImg: require('../assets/grid_4.png')
                },
                {
                    title: '大块居中',
                    id: 2,
                    img: require('../assets/grid_2.png'),
                    activeImg: require('../assets/grid_2.png')
                },
                {
                    title: '大块居左',
                    id: 3,
                    img: require('../assets/grid_3.png'),
                    activeImg: require('../assets/grid_3.png')
                },
            ],
            activeIndex: 1,
        }
    },
    methods: {
        onColorChange(val) {
            this.$store.commit('SET_COLOR', val)
        },
        onLayoutClk(item) {
            this.activeIndex = item.id;
            this.$store.commit('SET_LAYOUT',item.id)
        }
    }
}
</script>

<style scoped>
.wraps {
    /* height: 0.24rem; */
    padding: 0.16rem 0.36rem 0.16rem 0.2rem;
    background-color: rgba(29, 29, 29, 0.94);
}

.titles {
    font-weight: 700;
    color: #ffffff;
    font-size: 24px;
}

.l_r {
    font-size: 0.16rem;
}

.l_r img {
    height: 0.24rem;
    width: 0.26rem;
}

.set_color {
    color: #cccccc;
    font-size: 14px;
    display: flex;
    align-items: center;
}

.colorPicker {
    margin-left: 0.12rem;
    font-size: 0.16rem;
    height: 0.24rem;
}

.colorPicker>>>.el-color-picker__trigger {
    height: 0.24rem;
    width: 0.24rem;
}

.colorPicker>>>.el-color-picker__color {
    border: none;
}

.grid_wrap {
    color: #cccccc;
    font-size: 14px;
    display: flex;
    align-items: center;
}

.grid_box {
    height: 0.24rem;
    width: 0.24rem;
    overflow: hidden;
    margin-left: 0.12rem;
}

.grid_box img {
    height: 100%;
    width: 100%;
    cursor: pointer;
}

.grid_box:hover img {
    transform: scale(1.3);
}

.btn_wrap {
    font-size: 0.16rem;
}


.grid_item_box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
}

.grid_item_box div {
    width: 0.66rem;
    height: 0.4rem;
    margin-top: 0.1rem;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>