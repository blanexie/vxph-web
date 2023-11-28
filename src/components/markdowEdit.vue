<template>
    <div>
        <el-form :model="post" label-width="120px">
            <el-form-item label="title">
                <el-input v-model="post.title" />
            </el-form-item>
            <el-form-item label="cover">
                <el-input v-model="post.coverImg" />
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
        <MdEditor v-model = "markdownText" />

    </div>
</template>
  
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { Post } from '../common/class';

const markdownText = ref("")
const post = reactive<Post>(new Post())

</script>