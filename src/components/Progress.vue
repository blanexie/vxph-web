<template>
  <el-dialog v-model="props.show" width="400px" :close-on-press-escape="false" :show-close="false">
    <el-progress :percentage="props.modelValue"></el-progress>
  </el-dialog>
</template>
<style scoped>

</style>
<script setup lang="ts">
const props = defineProps(['modelValue', 'show'])
const emit = defineEmits(['update:modelValue'])

</script>