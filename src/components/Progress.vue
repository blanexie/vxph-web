<template>
  <el-dialog v-model="props.show" :close-on-press-escape="false" :show-close="true" @before-close="beforeClose">
    <el-progress type="dashboard" :percentage="props.modelValue">
    </el-progress>
  </el-dialog>
</template>
<style scoped>

</style>
<script setup lang="ts">
const props = defineProps(['modelValue', 'show'])
const emit = defineEmits(['update:modelValue'])


const beforeClose = (done: DoneFn) => {

}
</script>