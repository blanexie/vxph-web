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
                <input type="file" @change="torrentInputChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="test">test</el-button>
                <el-button type="primary" @click="savePost">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="card-div">
        <MdEditor class="edit" v-model="markdownText" @onUploadImg="onUploadImg" :sanitize="sanitize" />
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
import { fileResourceReq, postReq, baseServerURL } from '../common/request'
import { useRoute, useRouter } from "vue-router"
const router = useRouter()
const props = defineProps(['modelValue'])
const imgs: Map<String, FileResource> = new Map()
const markdownText = ref<string>("")
const post = ref<Post>(new Post())

onMounted(() => {
    // 初始化
    post.value = (props.modelValue as Post) ?? new Post()
    markdownText.value = post.value.markdown
});


const test = () => {
    router.push({
        path: "/postProview",
        query: { postId: '1' }
    })
}

//保存
const savePost = async () => {
    const postData = post.value
    //0. 校验必填项目
    console.log("开发阶段，跳过必填项目", postData)
    //1. 上传FileResource 
    postData.imgs = [...imgs.values()]
    const files = postData.imgs.concat(postData.coverImg)

    // 按照发送顺序处理结果  
    for (const resource of files) {
        await fileResourceReq.upload(resource)
            .then(resp => {
                if (resp) {
                    let data = resp.data
                    resource.createTime = data.createTime
                    resource.updateTime = data.updateTime
                    resource.owner = data.owner
                    resource.versionNo = data.versionNo
                    resource.status = data.status
                }
            })
    }

    //2. 保存post
    postData.markdown = markdownText.value
    await postReq.save(postData).then(resp => {
        console.log("save post ", resp)
    })

    //3. 上传保存torrent

}

const torrentInputChange = (element) => {
    post.value.torrents = element.target.files
}

const onUploadImg = async (files: File[], callback) => {
    const res = await Promise.all(
        files.map(file => {
            return new Promise((res, rej) => {
                fileToBase64(file, (it: FileResource) => {
                    if (it.base64 != "") {
                        imgs.set(it.url, it)
                        res(it)
                    } else {
                        rej(it)
                    }
                });
            });
        })
    )
    let rs = res as FileResource[]
    callback(rs.map((item) => item.url));
};

const sanitize = (html: string) => {
    console.log("sanitize", html)
    let rhtml = modifyHTML(html, imgs)
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