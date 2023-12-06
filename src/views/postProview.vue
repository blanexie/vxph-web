<template>
    <div class="card-div">
        <el-form :model="post" label-width="120px">
            <el-form-item label="帖子标题：">
                <div class="title">{{ post?.title }}</div>
            </el-form-item>
            <el-form-item label="帖子封面：">
                <p>{{ post?.coverImg?.url }}</p>
                <vx-image :imgurl="post?.coverImg?.url" style="height: 200px" fit="fill"></vx-image>
            </el-form-item>
            <el-form-item label="分类标签：">
                <el-tag v-for="item in post?.labels" :key="item.id" size="large" class="tag">
                    {{ item.name }}
                </el-tag>
            </el-form-item>
            <el-form-item label="Torrent：">
                <input type="file" />
            </el-form-item>
        </el-form>
    </div>
    <div class="card-div">
        <MdPreview class="edit" :modelValue="post?.markdown" />
        <MdCatalog :scrollElement="scrollElement" />
    </div>
</template>
<style scoped >
.card-div {
    min-width: 850px;
}

.title {
    font-size: 17px;
}

.tag {
    margin: 5px;
}

.edit {
    max-width: 1080px;
}

.title {
    width: 560px;
}

.coverClass {
    height: 150px;
}
</style>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { Post, FileResource } from '../common/class';
import { postReq } from '../common/request';
import { useRoute, useRouter } from 'vue-router'
import VxImage from '../components/VxImage.vue';

const route = useRoute()
const post = ref<Post>()
const scrollElement = document.documentElement;

const init = () => {
    let postId = route.query.postId
    postReq.findById(postId).then(resp => {
        post.value = resp.data
    })
}
init();

</script>