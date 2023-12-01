<template>
    <div class="card-div">
        <el-form :model="post" label-width="120px">
            <el-form-item label="帖子标题：">
                <el-input class="title" v-model="post.title" />
            </el-form-item>
            <el-form-item label="帖子封面：">
                <ImgSelect v-model="post.coverImg"></ImgSelect>
            </el-form-item>
            <el-form-item label="分类标签：">
                <LabelSelect v-model="post.labels"></LabelSelect>
            </el-form-item>
            <el-form-item label="Torrent：">
                <input type="file" />
            </el-form-item>
        </el-form>
    </div>
    <div class="card-div">
        <MdPreview class="edit" :modelValue="post.markdown" />
        <MdCatalog :scrollElement="scrollElement" />
    </div>
</template>
<style scoped >
.card-div {
    min-width: 850px;
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
import ImgSelect from '../components/ImgSelect.vue'
import LabelSelect from '../components/labelSelect.vue'

const route = useRoute()

const post = ref<Post>(new Post())
const scrollElement = document.documentElement;

onMounted(() => {
    let postId = route.query.postId
    postReq.findById(postId).then(resp => {
        post.value = resp.data
    })
});

</script>