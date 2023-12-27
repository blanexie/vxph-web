<template>
    <el-image :lazy="true" :style="style" @click="dialogShow"  :src="src"/>
</template>
<style scoped>

</style>
<script lang="ts" setup>
import {onMounted, watch, ref, reactive} from 'vue';
import {parseImgUrl} from '@/common/util';

const props = defineProps(['url', 'width', 'height'])
const src = ref()
const dialogTableVisible = ref(false)

const style = reactive({
  width: props.width + 'px',
  height: props.height + 'px',
})
const dialogShow = () => {
  dialogTableVisible.value = !dialogTableVisible.value
}
const init = () => {
  console.log(props)
  const url = props.url as string
  src.value = parseImgUrl(url)
}

watch(props, (nweProps) => {
  init()
})

onMounted(init)
</script>