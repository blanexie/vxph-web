<template>
    <el-image :src="src"></el-image>
</template>
<script lang="ts" setup>
import { onMounted, ref, toRefs } from 'vue';
import { baseServerURL } from '../common/request';
import { stringLiteral } from '@babel/types';

const props = defineProps(['src'])
const { src } = toRefs(props)

onMounted(() => {
    const satoken = localStorage.getItem("satoken")
    const url = src?.value
    console.log(url)
    if (url) {
        if (url.startsWith("http") || url.startsWith("//")) {
            src.value = url
        } else if (url.startsWith("/")) {
            src.value = baseServerURL + "" + url
        } else if (url.startsWith("data:")) {
            src.value = url
        } else {
            throw Error("无法识别的图片链接地址")
        }
        if (src.value.includes("?")) {
            src.value = src.value + "&satoken=" + satoken
        } else {
            src.value = src.value + "?satoken=" + satoken
        }
    }
})
</script>