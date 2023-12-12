<template>
  <div class="card-div">
    <el-form :model="post" label-width="120px">
      <el-form-item label="帖子标题：">
        <el-input class="title" v-model="post.title"/>  <el-button type="primary" @click="savePost">发布</el-button>
      </el-form-item>
      <el-form-item label="帖子封面：">
        <img-select v-model="post.coverImg"></img-select>
      </el-form-item>
      <el-form-item label="帖子分类：">
        <PostType v-model="post.type"></PostType>
      </el-form-item>
      <el-form-item label="帖子标签：">
        <LabelSelect v-model="post.labels"></LabelSelect>
      </el-form-item>
      <el-form-item label="Torrent：">
        <el-upload ref="uploadRef" class="upload" v-model:file-list="torrents" :on-exceed="handleExceed" :limit="1"
                   :auto-upload="false">
          <template #trigger>
            <el-button type="primary">选择文件</el-button>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>

    <MdEditor class="edit" :toolbars="toolbars" v-model="markdownText" @onUploadImg="onUploadImg" :sanitize="sanitize"/>
  </div>

  <div>
    <Progress v-model="progress.per" v-model:show="progress.show"></Progress>
  </div>
</template>
<style scoped>
.title {
  width: 560px;
}

.upload {
  width: 850px;
}

.edit {
  max-width: 1024px;
}
</style>
<script lang="ts" setup>
import 'md-editor-v3/lib/style.css';
import {onMounted, reactive, ref} from 'vue';
import {MdEditor, ToolbarNames} from 'md-editor-v3';
import ImgSelect from "@/components/ImgSelect.vue"
import LabelSelect from '@/components/LabelSelect.vue'
import PostType from '@/components/PostType.vue'
import Progress from '@/components/Progress.vue'
import {FileResource, Post} from '@/common/class';
import {fileToBase64, modifyHTML} from '@/common/util';
import {fileResourceReq, postReq, torrentReq} from '@/common/request'
import {ElNotification, UploadUserFile} from "element-plus";
import {genFileId} from 'element-plus'
import type {UploadInstance, UploadProps, UploadRawFile} from 'element-plus'
import {useRouter} from 'vue-router'

const router = useRouter()

const progress = reactive<{ per: number, show: boolean }>({per: 0, show: false})
const imgMap: Map<String, FileResource> = new Map()
const markdownText = ref<string>("")
const post = ref<Post>(new Post())

const torrents = ref<UploadUserFile[]>()
const uploadRef = ref<UploadInstance>()


onMounted(() => {
  // 初始化
});

const handleExceed: UploadProps['onExceed'] = (files) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
}

//保存
const savePost = async () => {
  const postData = post.value
  //0. 校验必填项目
  //标题校验
  if (postData.title == '' || postData.title == undefined) {
    ElNotification.error({title: "必填", message: "标题必填"})
    return
  }
  //封面校验
  if (postData.coverImg.base64 == '') {
    ElNotification.error({title: "必填", message: "封面图片必填"})
    return
  }
  //torrent校验
  if (torrents.value?.length == 0) {
    ElNotification.error({title: "必填", message: "torrent文件必填"})
    return
  }
  progress.show = true
  progress.per = 30
  //1. 上传FileResource
  postData.imgs = [...imgMap.values()]
  const files = [postData.coverImg, ...postData.imgs]
  progress.per = 40
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
  progress.per = 60
  //2. 保存post
  postData.markdown = markdownText.value
  await postReq.save(postData).then(resp => {
    if (resp) {
      post.value = resp.data
    }
  })
  progress.per = 70
  //3. 上传保存torrent
  for (let torrent of torrents.value!) {
    await torrentReq.upload(post.value.id + "", torrent.raw!)
        .then(resp => {
          console.log(resp)
        })
  }
  progress.per = 90
  progress.per = 100

  await router.push("/postProview?postId=" + post.value.id)
}

const onUploadImg = async (files: File[], callback: Function) => {
  const res = await Promise.all(
      files.map(file => fileToBase64(file))
  )
  const urls = res.map(it => {
    if (it instanceof FileResource) {
      imgMap.set(it.url, it)
      return it
    } else {
      return undefined
    }
  }).filter(it => it).map(it => it!.url)
  callback(urls);
};

const sanitize = (html: string): string => {
  console.log("sanitize before", html, imgMap)
  const rhtml = modifyHTML(html, imgMap)
  console.log("sanitize after", rhtml, imgMap)
  return rhtml
}

const toolbars = ref<ToolbarNames[]>([
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