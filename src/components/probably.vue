<template>
    <div class="wraps">
        <div class="list_item" v-for="(item, i) in list" :key="i">
            <div class="tops">
                <p class="title">{{ item.title }}</p>
                <p class="see_more" @click="onSeeMoreClk(item)">查看更多</p>
            </div>
            <div class="item_content_wrap">
                <draggable v-model="item.componentList" @end="onDragEnd" :move="onDragMove"
                    :group="{ name: 'content', pull: 'clone', put: false }" :sort='false' animation="300">
                    <transition-group
                        style="display: flex; height: 100%;flex-wrap: wrap;justify-content: space-between;">
                        <img v-for="(item, z) in item.componentList" draggable="true" :key="(z + new Date().getTime())"
                            src="../assets/some_img.png" alt="">
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
            list: [
                { title: '柱状图', id: 1, componentList: [{ id: 1 }, {}, {}, {}, {}] },
                { title: '饼图', id: 2, componentList: [{}, {}, {}, {}, {}] },
                { title: '折线图', id: 3, componentList: [{}, {}, {}, {}, {}] },
                { title: '关系图', id: 4, componentList: [{}, {}, {}, {}, {}] },
                { title: '混合图', id: 5, componentList: [{}, {}, {}, {}, {}] },
                { title: '玫瑰图', id: 6, componentList: [{}, {}, {}, {}, {}] },
            ]
        }
    },
    methods: {
        onSeeMoreClk(item) {
            this.$emit('onSeeMoreClk', item)
        },
        onDragEnd(x) {
            // console.log(x);

        },
        // 停靠
        onDragMove(x) {
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
        }
    }
}
</script>

<style scoped>
.wraps {
    height: calc(100vh - 1.61rem);
    width: 100%;
    margin-top: 0.18rem;
    display: flex;
    flex-direction: column;
}

.tops {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title {
    font-weight: 600;
    color: #ffffff;
    font-size: 14px;
}

.see_more {
    font-weight: 300;
    color: #cccccc;
    font-size: 12px;
    cursor: pointer;
}

.list_item {
    width: 100%;
}

.item_content_wrap {
    margin: 0.1rem 0 0.14rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 2.1rem;
    overflow: hidden;
}

.item_content_wrap img {
    width: 1.25rem;
    height: 1rem;
    margin-bottom: 0.1rem;
}
</style>