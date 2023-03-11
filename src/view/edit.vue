<template>
    <div class="all_wrap">
        <!-- <componentList></componentList> -->
        <div class="menu_wrap">
            <draggable v-model="menuList" :move="leftMove" @end="leftToright"
                :group="{ name: 'title', pull: 'clone', put: false }" :sort='false' , animation="300">
                <transition-group>
                    <div class="menu_list" :key="item.id" v-for="item in menuList" :style="{ background: item.color }">
                        {{ item.title }}
                    </div>
                </transition-group>
            </draggable>

        </div>
        <vue-ruler-tool class="wraps" :content-layout="{ left: 200, top: 100 }" :is-scale-revise="true"
            :preset-line="presetLine">
            <div class="backgrounds">
                <div class="top_wrap">
                    <div class="top_left">
                        <draggable @change="onRightChange" class="t_l" style="height:100%;width:100%"
                            :group="{ name: 'time', pull: true }">
                            <transition-group style="height:100%;width:100%;display: block;">
                                <div v-for="(item, i) in l_list" style="height:100%;width:100%" :key="item.title"
                                    :style="{ background: item.color }">{{ item.title }}</div>
                            </transition-group>
                        </draggable>
                    </div>
                    <div class="top_center">
                        <draggable class="t_c" style="height:100%;width:100%"
                            :group="{ name: 'title', pull: true }">
                            <transition-group style="height:100%;width:100%;display: block;">
                                <div v-for="(item, i) in c_list" style="height:100%;width:100%" :key="item.title"
                                    :style="{ background: item.color }">{{ item.title }}</div>
                            </transition-group>
                        </draggable>
                    </div>
                    <div class="top_right"></div>
                </div>
                <div></div>
            </div>
        </vue-ruler-tool>
    </div>
</template>
<script>
import VueDragResize from 'vue-drag-resize';
import componentList from '../components/componentList.vue'
import draggable from 'vuedraggable'
export default {
    data() {
        return {
            presetLine: [{ type: 'l', site: 100 }, { type: 'v', site: 200 }],
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            l_list: [],
            atv: false,
            menuList: [],
            c_list:[]
        }
    },
    components: {
        VueDragResize,
        componentList,
        draggable
    },
    methods: {
        onRightChange(e) {
            console.log(e);
        },
        onLeftChange(a) {
            console.log(a);
            // console.log(this.l_list);
        },
        leftToright(e) {
            if (e.to.parentElement._prevClass == 't_l') {
                this.l_list.push(e.item._underlying_vm_)
            }
            if (e.to.parentElement._prevClass == 't_c') {
                this.c_list.push(e.item._underlying_vm_)
            }
        },
        leftMove(e) {
            if (e.to.parentElement._prevClass == 't_l') { 
                if (this.l_list.length) {
                    return false
                }
            }
            if (e.to.parentElement._prevClass == 't_c') {
                if (this.c_list.length) {
                    return false
                }
            }
            // console.log(e);
        },
        onRightStart(e) {
            console.log(e);
        },
        onRightRemove(e) {
            console.log(e);
        },
        rightToLeft(e) {
            console.log(e);
        },
        onMove(e, originalEvent) {
            // console.log(e);
            rteurn
            // this.rightMoveId = e.draggedContext.element.id;
            // if (e.to.parentElement._prevClass == "menu_wrap") {
            //     return false
            // }
        },
        // resize(newRect) {
        //     this.width = newRect.width;
        //     this.height = newRect.height;
        //     this.top = newRect.top;
        //     this.left = newRect.left;
        // },
        // onDragStartCallback(msg) {
        //     if (msg.top >= 0 && msg.top < 40 && msg.left >= 0 && msg.left < 112) {
        //         if (this.l_list.length) {
        //             return false
        //         } else {
        //             this.l_list.push({})
        //         }
        //     }
        // },
        // ontopDragStartCallback() {

        // }
    },
    mounted() {
        for (let z = 0; z < 10; z++) {
            this.menuList.push({ id: z + 1, title: '第' + (z + 1) + '个组件', color: '#1122' + (z + 1) + (z + 1) })
        }
    }
}
</script>
<style scoped>
.all_wrap {
    height: 100vh;
    ;
    width: 100vw;
    display: flex;
}

.menu_wrap {
    height: 100%;
    overflow: auto;
    width: 300px;
}

.menu_list {
    height: 150px;
    width: 100%;
    color: #fff;
}

.backgrounds {
    height: 630px;
    width: 1120px;
    background-color: #ccc;
}

.top_wrap {
    height: 80px;
    display: flex;
}

.top_left,
.top_right {
    width: 224px;
    height: 100%;
    border: 1px solid #fff;
}

.top_center {
    width: 672px;
    height: 100%;
}

.wraps>>>.vue-ruler-content {
    padding: 0 !important;
}
</style>