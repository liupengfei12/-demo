<template>
    <div class="wraps">
        <img v-for="(item, i) in componentList" :key="i" src="../assets/some_img.png" alt="">
    </div>
</template>

<script>
export default {
    data() {
        return {
            componentList: [],
        }
    },
    mounted() {
        for (let z = 0; z < 100; z++) {
            this.componentList.push({})
        }
    },
}
</script>

<style scoped>
.wraps {
    height: calc(100vh - 1.61rem);
    width: 100%;
    margin-top: 0.18rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;
}

.wraps img {
    width: 1.25rem;
    height: 1rem;
    margin-bottom: 0.1rem;
}
</style>