<template>
    <div class="models" :style="{ backgroundColor: backgroundColor }">
        <draggable :move="onDragMove" class="models_top" v-model="contenList[6]" :group="{ name: 'content' }"
            animation="300">
            <transition-group style="display: flex; height: 100%;width:100%;overflow: hidden;">
                <component :style="{ width: z == 0 || z == 2 ? '20%' : '60%' }" :is="'ceshi'"
                    v-for="(item, z) in contenList[6]" :key="(z)"></component>
            </transition-group>
        </draggable>
        <div class="models_conetnt">
            <draggable :move="onDragMove" class="models_content_item models_content_center" v-model="contenList[2]"
                animation="300" :group="{ name: 'content' }">
                <transition-group style="display: block; height: 100%;width:100%">
                    <img v-for="(item, z) in contenList[2]" :key="(z + new Date().getTime())"
                        src="../../assets/some_img.png" alt="">
                </transition-group>
            </draggable>
            <div class="conetnt_l_r">
                <draggable :move="onDragMove" class="models_content_item" v-model="contenList[0]" animation="300"
                    :group="{ name: 'content' }">
                    <transition-group style="display: block; height: 100%;width:100%">
                        <img v-for="(item, z) in contenList[0]" :key="(z + new Date().getTime())"
                            src="../../assets/some_img.png" alt="">
                    </transition-group>
                </draggable>
                <draggable :move="onDragMove" class="models_content_item" v-model="contenList[1]" animation="300"
                    :group="{ name: 'content' }">
                    <transition-group style="display: block; height: 100%;width:100%">
                        <img v-for="(item, z) in contenList[1]" :key="(z + new Date().getTime())"
                            src="../../assets/some_img.png" alt="">
                    </transition-group>
                </draggable>
            </div>
            <div class="conetnt_l_r">
                <draggable :move="onDragMove" class="models_content_item" v-model="contenList[4]" animation="300"
                    :group="{ name: 'content' }">
                    <transition-group style="display: block; height: 100%;width:100%">
                        <img v-for="(item, z) in contenList[4]" :key="(z + new Date().getTime())"
                            src="../../assets/some_img.png" alt="">
                    </transition-group>
                </draggable>
                <draggable :move="onDragMove" class="models_content_item" v-model="contenList[5]" animation="300"
                    :group="{ name: 'content' }">
                    <transition-group style="display: block; height: 100%;width:100%">
                        <img v-for="(item, z) in contenList[5]" :key="(z + new Date().getTime())"
                            src="../../assets/some_img.png" alt="">
                    </transition-group>
                </draggable>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            contenList: [[], [], [], [], [], [], []],
        }
    },
    methods: {
        // 停靠
        onDragMove(x) {
            // console.log(x);
            if (x.related.parentNode.parentNode._prevClass == 'models_top') {
                console.log(x);
                if (x.relatedContext.list.length >= 3) {
                    return false
                }
            } else {
                if (x.relatedContext.list.length) {
                    return false
                }
            }
        },
    },
    computed: {
        backgroundColor() {
            return this.$store.state.modelBackgroundColor;
        }
    },
}
</script>

<style scoped>
.models {
    width: 12.3rem;
    height: 6.92rem;
    background-color: #04172a;
}

.models_top {
    width: 100%;
    height: 0.6rem;
    background-color: #062543;
    overflow: hidden;
}

.models_conetnt {
    padding: 0.16rem 0.2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    height: calc(100% - 0.32rem - 0.6rem);
    overflow: hidden;
}

.models_conetnt>>>img {
    height: 100%;
    width: 100%;
}

.models_content_item {
    width: 3.85rem;
    height: 2.92rem;
    background-color: #062543;
    border: 1px solid;
    border-color: transparent;
}

.models_content_item:hover {
    background-color: #06396c;
    border-color: #0a84ff;
}

.models_top:hover {
    background-color: #06396c;
    border-color: #0a84ff;
}

.conetnt_l_r {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
}

.models_content_center {
    height: 100%;
}
</style>