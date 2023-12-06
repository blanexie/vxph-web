<template>
  <div class="card-div">
    <el-form :model="post" label-width="120px">
      <el-form-item label="帖子标题：">
        <el-input class="title" v-model="post.title"/>
      </el-form-item>
      <el-form-item label="帖子封面：">
        <ImgSelect v-model="post.coverImg"></ImgSelect>
      </el-form-item>
      <el-form-item label="分类标签：">
        <LabelSelect v-model="post.labels"></LabelSelect>
      </el-form-item>
      <el-form-item label="Torrent：">
        <label class="input-file-button" for="upload"> 选择Torrent文件 </label>
        <input type="file" id="upload" @change="torrentInputChange"/> &nbsp;
        <el-tag v-for="item in post.torrentFiles" @close="tagClose" closable :key="item.name">{{ item.name }}</el-tag>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="test">test</el-button>
        <el-button type="primary" @click="savePost">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="card-div">
    <MdEditor class="edit" v-model="markdownText" @onUploadImg="onUploadImg" :sanitize="sanitize"/>
  </div>
</template>
<style scoped>
.input-file-button {
  padding: 2px 10px;
  background: #409eff;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

#upload {
  display: none;
}


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
import 'md-editor-v3/lib/style.css';
import {onMounted, ref} from 'vue';
import {MdEditor} from 'md-editor-v3';
import ImgSelect from '@/components/ImgSelect.vue'
import LabelSelect from '@/components/labelSelect.vue'
import {FileResource, Post} from '@/common/class';
import {fileToBase64, modifyHTML} from '@/common/util';
import {fileResourceReq, postReq, torrentReq} from '@/common/request'
import {useRouter} from "vue-router"
import Notification from "../common/notification"


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
    query: {postId: '1'}
  })
}
const tagClose = (e) => {
  post.value.torrentFiles = []
}

//保存
const savePost = async () => {
  const postData = post.value
  console.log(postData.title)
  //0. 校验必填项目
  //标题校验
  if (postData.title == '' || postData.title == undefined) {
    Notification.error("必填", "标题必填")
    return
  }
  //封面校验
  if (postData.coverImg == null || postData.coverImg.base64 == '') {
    Notification.error("必填", "封面图片必填")
    return
  }
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
    if (resp) {
      post.value = resp.data
      post.value.torrentFiles = postData.torrentFiles
    }
  })
  //3. 上传保存torrent
  await torrentReq.upload(post.value.id + "", postData.torrentFiles[0])
      .then(resp => {
        console.log(resp)
      })
}

const torrentInputChange = (element) => {
  post.value.torrentFiles = element.target.files
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
  return modifyHTML(html, imgs)
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