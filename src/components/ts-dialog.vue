<template>
    <el-dialog v-bind="$attrs" class="dialogs" v-on="$listeners">
        <slot></slot>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCacelBtnclk">取消</el-button>
            <el-button type="primary" @click="onSubmit">新建</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods:{
        onCacelBtnclk(){
            this.$emit('onCancel')
        },
        onSubmit(){
            this.$emit('onSubmit')
        },
    }
}
</script>

<style scoped>
.dialogs {
    font-size: 0.16rem;
}

.dialogs>>>.el-dialog {
    background-color: #202020;
    border-radius: 3px;
}

.dialogs>>>.el-dialog__title {
    color: #fff;
}

.dialog-footer {
    height: 0.68rem;
    background-color: rgba(255, 255, 255, 0.03);
}
</style>