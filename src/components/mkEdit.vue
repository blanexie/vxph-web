<template>
    <div>
        <el-form :model="post" label-width="120px">
            <el-form-item label="标题">
                <el-input v-model="post.title" />
            </el-form-item>
            <el-form-item label="封面">
                <ImgSelect v-model="post.coverImg"></ImgSelect>
            </el-form-item>
            <el-form-item label="分类和标签">
                <LabelSelect v-model="post.labels"></LabelSelect>
            </el-form-item>
            <el-form-item label="Torrent">
                <input type="file" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="test">test</el-button>
                <el-button type="primary" @click="$emit('update:modelValue', post)">提交</el-button>
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
import LabelSelect from './labelSelect.vue'

defineProps(['modelValue'])
defineEmits(['update:modelValue'])

const markdownText = ref<string>("")

const post = reactive<Post>(new Post())

const test = () => {
    console.log(post)
}


</script>