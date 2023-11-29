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
                <input type="file" @change="torrentInputChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="test">test</el-button>
                <el-button type="primary" @click="$emit('update:modelValue', post)">提交</el-button>
            </el-form-item>
        </el-form>

        <MdEditor v-model="markdownText" @onUploadImg="onUploadImg" :sanitize="sanitize" :toolbars="toolbars" />

    </div>
</template>
<style scoped >
.coverClass {
    height: 150px;
}
</style>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { MdEditor, ToolbarNames } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { Post, FileResource } from '../common/class';
import ImgSelect from './ImgSelect.vue'
import LabelSelect from './labelSelect.vue'
import { fileToBase64, modifyHTML } from '../common/util';


defineProps(['modelValue'])


const fileMap = reactive<Map<String, FileResource>>(new Map())

const markdownText = ref<string>("")

const post = reactive<Post>(new Post())

const test = () => {
    console.log(post)
    console.log(markdownText.value)
}

const torrentInputChange = (element) => {
    post.torrents = element.target.files
}



const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
        files.map((file) => {
            return new Promise((rev, rej) => {
                fileToBase64(file, (it: FileResource) => {
                    if (it.base64 != "") {
                        fileMap.set(it.url, it)
                        rev(it)
                    } else {
                        rej(it)
                    }
                })
            });
        })
    );

    callback(res.map((item) => item.url));
};
const sanitize = (html: string) => {
    let rhtml = modifyHTML(html, fileMap)
    return rhtml
}

const toolbars = ref([
    'bold',
    'underline',
    'italic',
    '-',
    'title',
    'strikeThrough',
    'sub',
    'sup',
    'quote',
    'unorderedList',
    'orderedList',
    'task',
    '-',
    'link',
    'image',
    'table',
    '-',
    'revoke',
    'next',
    'save',
    '=',
    'pageFullscreen',
    'fullscreen',
    'preview',
    'catalog',
    'github'
]);
</script>