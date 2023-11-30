<template>
    <div class="card-div">
        <el-form :model="post" label-width="120px">
            <el-form-item label="标题">
                <el-input class="title" v-model="post.title" />
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
                <el-button type="primary" @click="savePost">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="card-div">
        <MdEditor class="edit" v-model="markdownText" @onUploadImg="onUploadImg" :sanitize="sanitize"
            :toolbars="toolbars" />

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
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { Post, FileResource } from '../common/class';
import ImgSelect from '../components/ImgSelect.vue'
import LabelSelect from '../components/labelSelect.vue'
import { fileToBase64, modifyHTML } from '../common/util';
import { fileResourceReq } from '../common/request'
import { postReq } from '../common/request';

const props = defineProps(['modelValue'])
const fileMap = reactive<Map<String, FileResource>>(new Map())
const markdownText = ref<string>("")
const post = ref<Post>(new Post())

onMounted(() => {
    // 初始化
    post.value = (props.modelValue as Post) ?? new Post()
    markdownText.value = post.value.markdown
});

//保存
const savePost = () => {
    const postData = post.value
    //0. 校验必填项目
    console.log("开发阶段，跳过必填项目", postData)
    //1. 上传FileResource 
    fileMap.forEach((v: FileResource, k: String) => {
        fileResourceReq.upload(v).then(resp => {
            if (resp) {
                fileMap.set(k, resp.data)
            }
        })
    })
    fileResourceReq.upload(postData.coverImg).then(resp => {
        if (resp) {
            postData.coverImg = resp.data
        }
    })
    //2. 保存post
    postData.markdown = markdownText.value
    postReq.save(postData).then(resp => {
        console.log("save post ", resp)
    })

    //3. 上传保存torrent

}

const torrentInputChange = (element) => {
    post.value.torrents = element.target.files
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