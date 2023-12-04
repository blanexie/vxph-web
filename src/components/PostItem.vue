<template>
    <div class="body">
        <div class="left">
            <el-image :src="props.post.coverImg.url"></el-image>
        </div>
        <div class="right">
            <div class="title">{{ props.post.title }}</div>
            <div>{{ props.post.coverImg.url }}</div>
            <div>3</div>
        </div>
    </div>
</template>
<style scoped>
.body {
    display: flex;
}

.left {
    height: 100px;
    width: 161px;
    margin-right: 16px;
}

.right {
    text-align: left;
}

.title {
    font-size: 18px;
    font-weight: 500;
    color: #222226;
    overflow: hidden;
    white-space: normal;
    word-break: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-height: 25px;
    margin-bottom: 4px;
}
</style>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { baseServerURL } from '../common/request';
const props = defineProps(['post'])
onMounted(() => {
    const coverImg = props.post.coverImg
    if (coverImg.url.startsWith("/")) {
        coverImg.url = baseServerURL + "" + coverImg.url
    }
    console.log(props.post)
})

</script>