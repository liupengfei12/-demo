<template>
    <div class="menu_wrap">
        <div class="menu_list" v-for="item in menuList" :style="{ background: item.color }" :key="item.id">{{ item.title
        }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menuList: [

            ]
        }
    },
    mounted() {
        for (let z = 0; z < 10; z++) {
            this.menuList.push({ id: z + 1, title: '第' + (z + 1) + '个组件', color: '#1122' + (z + 1) + (z + 1) })
        }
    }
}
</script>

<style  scoped>
.menu_wrap {
    height: 100%;
    overflow: auto;
    width: 300px;
}

.menu_list {
    height: 150px;
    width: 100%;
}
</style>