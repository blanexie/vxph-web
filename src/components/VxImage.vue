<template>
    <el-image :src="src"></el-image>
</template>
<script lang="ts" setup>
import { onMounted, watch, ref, toRefs } from 'vue';
import { parseImgUrl } from '../common/util';
const props = defineProps(['url'])
const src = ref()

const init = () => {
    const url = props.url as string
    src.value = parseImgUrl(url)
}

watch(props, (nweProps) => {
    init()
})

onMounted(init)
</script>