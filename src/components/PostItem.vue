<template>
    <div class="body">
        <div class="left">
            <el-image :src="props.post.coverImg.url"></el-image>
        </div>
        <div class="right">
            <div class="title">
                {{ props.post.title }} &nbsp;&nbsp;&nbsp;
                <el-tag v-for="tag in props.post.labels" type="success">{{ tag.name }}</el-tag>
                <span class="createTime">
                    {{ props.post?.createTime }}
                </span>
            </div>
            <div>
                <el-tag v-for="t in props.post.torrents">{{ t.title }}</el-tag>
            </div>
            <div>
                {{ complete }} &nbsp;
                {{ incomplete }} &nbsp;
                {{ downloaded }} &nbsp;
            </div>
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

.createTime {
    font-size: 12px;
}
</style>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Post } from '../common/class';
import { baseServerURL } from '../common/request';

const complete = ref(0)
const incomplete = ref(0)
const downloaded = ref(0)

const props = defineProps(['post'])
onMounted(() => {
    const post = props.post as Post
    const coverImg = props.post.coverImg
    if (coverImg.url.startsWith("/")) {
        coverImg.url = baseServerURL + "" + coverImg.url
    }
    complete.value = post.torrents.map(it => it.complete).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    incomplete.value = post.torrents.map(it => it.incomplete).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    downloaded.value = post.torrents.map(it => it.downloaded).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    console.log(complete, incomplete, downloaded)
})

</script>