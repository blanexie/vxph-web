<template>
    <div class="body">
        <div class="left">
            <VxImage v-model:url="coverImg.url"></VxImage>
        </div>
        <div class="right">
            <div class="title">
                <p>
                    <el-text class="mx-1">{{ post.title }} </el-text>
                    <el-text class="mx-1" size="small"> {{ post.createTime }} </el-text>
                </p>
                <p> <el-tag v-for="tag in post.labels" size="small" type="success">{{ tag.name }}</el-tag></p>
                <p v-for="t in torrents"> <el-text class="mx-1" size="small">{{ t.title }}</el-text></p>
                <p v-if="torrents.length == 0">&nbsp; </p>
            </div>

            <div>
                <el-text class="mx-1" size="small">做种中： {{ complete }} &nbsp;</el-text>
                <el-text class="mx-1" size="small">下载中： {{ incomplete }} &nbsp;</el-text>
                <el-text class="mx-1" size="small">下载完成： {{ downloaded }} &nbsp;</el-text>
            </div>
        </div>
    </div>
</template>
<style scoped>
.body {
    display: flex;
}

.mx-1 {
    margin-right: 10px;
}

.el-tag {
    margin-right: 10px;
}

.left {
    height: 100px;
    width: 161px;
    margin-right: 16px;
}

.right {
    text-align: left;
}
</style>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Post, Torrent, FileResource } from '@/common/class';
import VxImage from '@/components/VxImage.vue';

const complete = ref(0)
const incomplete = ref(0)
const downloaded = ref(0)
const coverImg = ref<FileResource>(new FileResource())
const post = ref<Post>(new Post())
const torrents = ref<Torrent[]>([])

const props = defineProps(['post'])
onMounted(() => {
    post.value = props.post as Post
    coverImg.value = props.post.coverImg as FileResource
    console.log(coverImg.value)
    torrents.value = props.post.torrents as Torrent[]
    const cv = torrents.value.map(it => it.complete)
    cv.forEach(it => {
        if (it) {
            complete.value += it
        }
    })
    const iv = torrents.value.map(it => it.incomplete)
    iv.forEach(it => {
        if (it) {
            incomplete.value += it
        }
    })
    const dv = torrents.value.map(it => it.downloaded)
    dv.forEach(it => {
        if (it) {
            downloaded.value += it
        }
    })
    console.log(post, complete, incomplete, downloaded)
})
</script>