<template>
    <div>
        <el-form :model="post" label-width="120px">
            <el-form-item label="标题">
                <el-input v-model="post.title" />
            </el-form-item>
            <el-form-item label="封面">
                <ImgSelect></ImgSelect>
            </el-form-item>

            <el-form-item label="label">
                <el-input v-model="post.labels" />
            </el-form-item>
            <el-form-item label="torrent">
                <el-input v-model="post.torrents" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click=" ">保存</el-button>
                <el-button type="primary" @click=" ">提交</el-button>
            </el-form-item>
        </el-form>
        <MdEditor v-model="markdownText" />

    </div>
</template>
<style scoped >
.coverClass {
    height: 150px;
}
</style>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { Post } from '../common/class';
import Notification from '../common/notification'
import ImgSelect from './ImgSelect.vue'
const markdownText = ref<string>("")

const post = reactive<Post>(new Post())


</script>