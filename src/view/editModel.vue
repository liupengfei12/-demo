<template>
    <div>
        <editHeaderVue></editHeaderVue>
        <div class="content_wrap">
            <modelListVue></modelListVue>
        </div>
    </div>
</template>

<script>
import editHeaderVue from '../components/editHeader.vue';
import modelListVue from '../components/modelList.vue';
export default {
    data() {
        return {

        }
    },
    components: {
        editHeaderVue,
        modelListVue
    }
}
</script>

<style scoped>
.content_wrap {
    width: 100%;
    height: calc(100vh - 0.63rem);
}
</style>