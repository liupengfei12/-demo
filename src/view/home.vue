<template>
    <div class="wrap">
        <div class="left_wrap">
            <div class="l_title">大屏编辑器</div>
            <div class="l_menu_w">
                <div class="l_menu_pd">
                    <div class="l_item" @click="$router.push('/showModel')" :class="{ active: $route.name == 'showModel' }">
                        <img src="../assets/dpgl.png" alt="">
                        <p>大屏管理</p>
                    </div>
                    <div class="l_item" @click="$router.push('/hsz')"  :class="{ active: $route.name == 'hsz' }">
                        <img src="../assets/hsz.png" alt="">
                        <p>回收站</p>
                    </div>
                </div>
            </div>
        </div>
        <router-view style="width: calc(100% - 2.08rem);"></router-view>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {

    },
    components: {

    }
}
</script>

<style  scoped>
.wrap {
    height: 100vh;
    width: 100vw;
    display: flex;
}

.left_wrap {
    height: 100%;
    width: 2.08rem;
}

.l_title {
    height: 0.56rem;
    width: 100%;
    background-color: rgba(29, 29, 29, 0.94);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #ffffff;
    font-size: 24px;
}

.l_menu_w {
    width: 100%;
    height: calc(100% - 0.56rem);
    background-color: rgba(0, 21, 41, 0.94);
}

.l_menu_pd {
    padding: 0.15rem 0.1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: inherit;
}

.l_item {
    width: 100%;
    height: 0.5rem;
    border-radius: 10px;
    font-size: 0.14rem;
    color: #fff;
    display: flex;
    align-items: center;
    cursor: pointer;

}

.active {
    background-color: rgba(118, 118, 128, 0.24);
}

.l_item img {
    width: 0.2rem;
    height: 0.18rem;
    margin: 0 0.1rem 0 0.14rem;
}

.hsz {
    background-color: transparent;
}
</style>