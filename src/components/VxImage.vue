<template>
    <el-image :lazy="true" :preview-src-list="prev" hide-on-click-modal :src="src">
    </el-image>
</template>
<style scoped>
.dialog {
    max-width: 1080px;
}

.dialog img {
    max-width: 1080px;
}
</style>
<script lang="ts" setup>
import { onMounted, watch, ref, toRefs } from 'vue';
import { parseImgUrl } from '@/common/util';
const props = defineProps(['url'])
const src = ref()
const prev = ref<string[]>()

const init = () => {
    const url = props.url as string
    src.value = parseImgUrl(url)
    if (src.value.startsWith("data:")) {
        prev.value = undefined
    } else {
        prev.value = [src.value]
    }
}

watch(props, (nweProps) => {
    init()
})

onMounted(init)
</script>