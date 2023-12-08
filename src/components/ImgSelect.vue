<template>
  <div>
    <p v-if="coverImg.show" class="imgShow">
      <vx-image fit="fill" class="coverClass" :src="coverImg.src"></vx-image>

      <el-tag class="coverTag" @close="tagClose" closable>{{ coverImg.name }}</el-tag>
    </p>

    <div class="input-file-button" v-if="!coverImg.show" @click="divClick">
      <div class="ccc">
        <el-icon class="plus">
          <Plus/>
        </el-icon>
        <div>添加封面图片</div>
      </div>
    </div>

    <input type="file" ref="inputs" @change="handleCoverImg" style="display: none;" accept="image/*"
           class="input-select"/>

  </div>
</template>
<style scoped>
.imgShow {
  cursor: pointer;
  position: relative;
  height: 150px;
  width: 243px;
}

.coverTag:hover {
  position: absolute;
  left: 49%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 1
}

.coverTag {
  position: absolute;
  left: 49%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.05
}


.input-file-button {
  padding: 9px 8px;
  border-radius: 4px;
  border: 1px #606266 dashed;
  cursor: pointer;
  position: relative;
  height: 150px;
  width: 243px;
}

.ccc {
  text-align: center;
  position: absolute;
  left: 49%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.plus {
  font-size: 40px;
  color: #606266;
}


.coverClass {
  width: 243px;
  height: 150px;
  border: 1px #dcdfe6 solid;
}
</style>
<script lang="ts" setup>
import {reactive, ref, onMounted} from 'vue';
import {fileToBase64} from '@/common/util';
import {FileResource} from '@/common/class';
import {Plus} from '@element-plus/icons-vue'
import VxImage from './VxImage.vue';

import {ElNotification} from 'element-plus'


const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

onMounted(() => {
  const modelValue: FileResource = props.modelValue
  if (modelValue) {
    coverImg.show = true
    coverImg.src = "/" + modelValue.hash + "." + modelValue.suffix
  }
});

const coverImg = reactive<{ show: Boolean, src: string, name: string }>({
  show: false,
  src: '',
  name: ''
})

const inputs = ref(null)

const divClick = () => {
  const ins = inputs.value as any
  ins.click()
}
const tagClose = () => {
  coverImg.src = ''
  coverImg.show = false
  coverImg.name = ''
  emit('update:modelValue', null)
}

const handleCoverImg = (element: any) => {
  const files = element.target.files
  fileToBase64(files[0])
      .then((resp: any) => {
        const fileResource = resp as FileResource
        coverImg.show = true
        coverImg.src = fileResource.base64
        coverImg.name = fileResource.name
        emit('update:modelValue', resp)
      })
      .catch((resp: string) => {
        ElNotification.error({
          message: resp,
          title: "解析图片失败"
        })
      })

}


</script>