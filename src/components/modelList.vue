<template>
    <div class="wraps">
        <div class="classification">
            <div @mouseenter="onMouseEnter(item)" @click="onMenuClk(item, z)" @mouseleave="onMouseLeave(item)"
                class="classification_i"
                :style="{backgroundColor:item.isHover?'rgba(118, 118, 128, 0.24)':'',backgroundColor:z==menuActiveIndex?'rgba(118, 118, 128, 0.24)':''}"
                v-for="(item,z) in classification" :key="item.title">
                <img :src="item.isHover || z == menuActiveIndex ? item.hover_img : item.img" alt="">
                <p
                    :style="{ color: item.isHover ? '#0a84ff' : '#48617b', color: z == menuActiveIndex ? '#0a84ff' : '#48617b' }">
                    {{ item.title }}</p>
            </div>
        </div>
        <div class="list_wrap" :style="{ width: probablyWidth + 'rem' }">
            <div class="list_pd" v-if="!showDetail">
                <div class="tab_wrap">
                    <button :class="{ actives: item.id == activeIndex }" v-for="item in tabList" :key="item.id"
                        @click="onTabClk(item)">{{ item.title
                        }}</button>
                </div>
                <!-- 分类组件和更多组件 -->
                <probablyVue @onSeeMoreClk="onSeeMoreClk" v-if="(activeIndex == 0)"></probablyVue>
                <recentlyVue v-else></recentlyVue>
            </div>
            <div v-else class="list_pd">
                <el-page-header class="page_header" :title="detailList.title" @back="goBack" content="">
                </el-page-header>
                <div class="item_content_wrap">
                    <!-- <img v-for="(item, z) in detailList.componentList" :key="z" src="../assets/some_img.png" alt=""> -->
                    <draggable v-model="detailList.componentList" :move="onDragMove"
                        :group="{ name: 'content', put: false }" :sort='false' animation="300">
                        <transition-group
                            style="display: flex; height: 100%;flex-wrap: wrap;justify-content: space-between;">
                            <img v-for="(item, z) in detailList.componentList" draggable="true"
                                :key="(z + new Date().getTime())" src="../assets/some_img.png" alt="">
                        </transition-group>
                    </draggable>
                </div>
            </div>
        </div>
        <div class="toggle_menu" @click="onToggleMenuClk"
            :style="{ left: (0.7 + probablyWidth) + 'rem', opacity: probablyWidth ? 1 : 0 }">
            <i class="el-icon-arrow-left"></i>
        </div>
        <div class="content">
            <baseVue v-if="(activeLayout == 1)"></baseVue>
            <centerVue v-else-if="(activeLayout == 2)"></centerVue>
            <leftsVue v-else></leftsVue>
            <!-- <div class="models" :style="{ backgroundColor: backgroundColor }">
                <draggable :move="onDragMove" class="models_top" v-model="contenList[6]" :group="{ name: 'content' }"
                    animation="300">
                    <transition-group style="display: flex; height: 100%;width:100%;overflow: hidden;">
                        <component :style="{ width: z == 0 || z == 2 ? '20%' : '60%' }" :is="'ceshi'"
                            v-for="(item, z) in contenList[6]" :key="(z)"></component>
                    </transition-group>
                </draggable>
                <div class="models_conetnt">
                    <draggable :move="onDragMove" class="models_content_item" v-model="contenList[0]" animation="300"
                        :group="{ name: 'content' }">
                        <transition-group style="display: block; height: 100%;width:100%">
                            <img v-for="(item, z) in contenList[0]" :key="(z + new Date().getTime())"
                                src="../assets/some_img.png" alt="">
                        </transition-group>
                    </draggable>
                    <draggable :move="onDragMove" class="models_content_item" v-model="contenList[1]" animation="300"
                        :group="{ name: 'content' }">
                        <transition-group style="display: block; height: 100%;width:100%">
                            <img v-for="(item, z) in contenList[1]" :key="(z + new Date().getTime())"
                                src="../assets/some_img.png" alt="">
                        </transition-group>
                    </draggable>
                    <draggable :move="onDragMove" class="models_content_item" v-model="contenList[2]" animation="300"
                        :group="{ name: 'content' }">
                        <transition-group style="display: block; height: 100%;width:100%">
                            <img v-for="(item, z) in contenList[2]" :key="(z + new Date().getTime())"
                                src="../assets/some_img.png" alt="">
                        </transition-group>
                    </draggable>
                    <draggable :move="onDragMove" class="models_content_item" v-model="contenList[3]" animation="300"
                        :group="{ name: 'content' }">
                        <transition-group style="display: block; height: 100%;width:100%">
                            <img v-for="(item, z) in contenList[3]" :key="(z + new Date().getTime())"
                                src="../assets/some_img.png" alt="">
                        </transition-group>
                    </draggable>
                    <draggable :move="onDragMove" class="models_content_item" v-model="contenList[4]" animation="300"
                        :group="{ name: 'content' }">
                        <transition-group style="display: block; height: 100%;width:100%">
                            <img v-for="(item, z) in contenList[4]" :key="(z + new Date().getTime())"
                                src="../assets/some_img.png" alt="">
                        </transition-group>
                    </draggable>
                    <draggable :move="onDragMove" class="models_content_item" v-model="contenList[5]" animation="300"
                        :group="{ name: 'content' }">
                        <transition-group style="display: block; height: 100%;width:100%">
                            <img v-for="(item, z) in contenList[5]" :key="(z + new Date().getTime())"
                                src="../assets/some_img.png" alt="">
                        </transition-group>
                    </draggable>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
// 分类
import probablyVue from './probably.vue';
// 最近
import recentlyVue from './recently.vue';

// 布局模式
import baseVue from './layout/base.vue';
import centerVue from './layout/center.vue';
import leftsVue from './layout/lefts.vue'
export default {
    data() {
        return {
            classification: [
                {
                    img: require('../assets/tb.png'),
                    hover_img: require('../assets/tb_hover.png'),
                    title: '图表',
                    isHover: false,
                },
                {
                    img: require('../assets/zs.png'),
                    hover_img: require('../assets/zs_hover.png'),
                    title: '装饰',
                    isHover: false,
                },
                {
                    img: require('../assets/text.png'),
                    hover_img: require('../assets/text_hover.png'),
                    title: '文字',
                    isHover: false,
                },
                {
                    img: require('../assets/table.png'),
                    hover_img: require('../assets/table_hover.png'),
                    title: '表格',
                    isHover: false,
                },
                {
                    img: require('../assets/player.png'),
                    hover_img: require('../assets/player_hover.png'),
                    title: '播放器',
                    isHover: false,
                },
                {
                    img: require('../assets/map.png'),
                    hover_img: require('../assets/map_hover.png'),
                    title: '地图',
                    isHover: false,
                },
                {
                    img: require('../assets/other.png'),
                    hover_img: require('../assets/other_hover.png'),
                    title: '其他',
                    isHover: false,
                },
            ],
            tabList: [
                { title: '推荐素材', id: 0 },
                { title: '最近使用', id: 1 },
            ],

            // tab
            activeIndex: 0,
            // menu
            menuActiveIndex: 0,
            // 详情数据
            detailList: {},
            // 是否显示详情
            showDetail: false,
            probablyWidth: 0
        }
    },

    watch: {

    },
    computed: {
        activeLayout() {
            return this.$store.state.layout;
        }
    },
    methods: {
        onMouseEnter(list) {
            list.isHover = true
        },
        onMouseLeave(list) {
            list.isHover = false;
        },
        onTabClk(list) {
            this.activeIndex = list.id
        },
        // 查看更多
        onSeeMoreClk(list) {
            this.detailList = list;
            this.showDetail = true;
        },
        // 更多返回
        goBack() {
            this.showDetail = false;
            this.detailList = {}
        },
        // 分类点击
        onMenuClk(list, i) {
            this.probablyWidth = 3
            this.menuActiveIndex = i;
        },
        // 收起
        onToggleMenuClk() {
            this.probablyWidth = 0
        },

    },
    components: {
        probablyVue,
        recentlyVue,
        baseVue,
        centerVue,
        leftsVue
    }
}
</script>

<style scoped>
.wraps {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
}

.classification {
    width: 0.7rem;
    background-color: rgba(0, 21, 41, 0.94);
    padding: 0.24rem 0;
    height: calc(100% - 0.48rem);
}

.classification_i {
    font-size: 16px;
    text-align: center;
    width: 100%;
    height: 0.56rem;
    cursor: pointer;
}

.classification_i img {
    width: 0.24rem;
    margin-top: 6px;
}

.classification_i p {
    font-size: 0.12rem;
    margin-top: 4px;
}

.list_wrap {
    width: 3rem;
    height: 100%;
    background-color: rgba(29, 29, 29, 0.94);
    overflow: auto;
    position: relative;
    transition: all .2s linear;
}

.list_pd {
    margin: 0.24rem 0.2rem;
    /* overflow-y: auto;
    overflow-x: hidden; */
}

.list_wrap::-webkit-scrollbar {
    width: 6px;
}

/* 滚动槽 */

.list_wrap::-webkit-scrollbar-track {
    /* -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3); */
    border-radius: 10px;
}

/* 滚动条滑块 */

.list_wrap::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ccc;
    /* background: rgba(0, 0, 0, 0.1); */
    /* -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5); */

}

.tab_wrap {
    width: 2.6rem;
    height: 0.32rem;
    display: flex;
    background-color: rgba(118, 118, 128, 0.24);
    border-radius: 9px;
}

.tab_wrap button {
    width: 50%;
    border: none;
    cursor: pointer;
    background-color: transparent;
    color: #fff;
    font-size: 0.14rem;
}

.actives {
    background-color: #636366 !important;
    border: 0.5px solid !important;
    border-color: rgba(0, 0, 0, 0.04) !important;
    border-radius: 7px !important;
}

.page_header>>>.el-page-header__left::after {
    width: 0 !important;
}

.page_header>>>.el-page-header__left {
    color: #fff !important;
}

.item_content_wrap {
    margin: 0.1rem 0 0.14rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.item_content_wrap img {
    width: 1.25rem;
    height: 1rem;
    margin-bottom: 0.1rem;
}

.toggle_menu {
    width: 0.2rem;
    height: 0.84rem;
    background-image: url('../assets/toggle_menu.png');
    position: absolute;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #f6f6f6;
    font-size: 0.18rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all .2s linear;
}

.content {
    height: 100%;
    flex: 1;
    background-color: #404040;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
</style>