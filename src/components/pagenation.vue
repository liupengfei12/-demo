<template>
    <el-pagination background class="pages" v-bind="$attrs" v-on="$listeners">
    </el-pagination>

</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.pages {
    font-size: 0.16rem;
    margin-top: 0.2rem;
    text-align: center;
}

.pages>>>.el-pagination__total {
    color: #fff;
}

.pages>>>.el-input__inner {
    background-color: #1d1d1d !important ; 
    border: 1px solid;
    border-color: #3196fa !important    ;
    color: #fff;
}

.pages>>>.btn-prev,
.pages>>>.btn-next {
    background-color: #3c3c3c !important;
    color: #7a7777 !important;
}

.pages>>>.el-pager li {
    background-color: #3c3c3c !important;
    color: #fff;
}

.pages>>>.el-pager li:not(.disabled).active {
    background-color: #3c3c3c !important;
    color: #0a84ff !important;
    font-weight: 500;
}

.pages>>>.el-pagination__jump {
    color: #fff !important;
}
</style>