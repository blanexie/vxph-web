<template>
  <div class="card-div">
    <el-form :model="post" label-width="120px">
      <el-form-item label="帖子标题：">
        <div class="title">{{ post?.title }}</div>
      </el-form-item>
      <el-form-item label="帖子封面：">
        <vx-image v-model:url="img" style="height: 150px;" fit="fill"></vx-image>
      </el-form-item>
      <el-form-item label="帖子分类：">
        <el-tag> {{ post.type }}</el-tag>
      </el-form-item>
      <el-form-item label="帖子标签：">
        <el-tag v-for="item in post?.labels" :key="item.id" size="large" class="tag">
          {{ item.name }}
        </el-tag>
      </el-form-item>
      <el-form-item label="Torrent：">
        <input type="file"/>
      </el-form-item>
    </el-form>
  </div>
  <div class="card-div">
    <MdPreview class="edit" :modelValue="post?.markdown"/>
    <MdCatalog :scrollElement="scrollElement"/>
  </div>
</template>
<style scoped>
.title {
  text-align: left;
  font-size: 17px;
}

.tag {
  margin: 5px;
}

.title {
  width: 560px;
}


</style>
<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import {MdPreview, MdCatalog} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {Post} from '@/common/class';
import {postReq} from '@/common/request';
import {useRoute, useRouter} from 'vue-router'
import VxImage from "@/components/VxImage.vue"

const route = useRoute()
const post = ref<Post>(new Post())
const scrollElement = document.documentElement;
const img = ref()
onMounted(() => {
  let postId = route.query.postId
  postReq.findById(postId).then((resp: any) => {
    post.value = resp.data
    img.value = resp.data.coverImg.url
  })
})
</script>