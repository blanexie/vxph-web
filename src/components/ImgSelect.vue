<template>
  <div>
    <div v-if="coverImg.show" class="imgShow">
      <vx-image :height="150" :width="243" :src="coverImg.src"></vx-image>
      <div class="zindex">
        <el-icon color="white" @click="closeIcon">
          <Close/>
        </el-icon>
      </div>
    </div>

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
.zindex {
  height: 150px;
  width: 243px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.zindex:hover {
  font-size: 25px;
  height: 150px;
  width: 243px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.imgShow {
  cursor: pointer;
  position: relative;
  height: 150px;
  width: 243px;
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

</style>
<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue';
import {fileToBase64} from '@/common/util';
import {FileResource} from '@/common/class';
import {Close, Plus} from '@element-plus/icons-vue'
import VxImage from './VxImage.vue';
import {ElNotification} from 'element-plus'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const inputs = ref(null)
const coverImg = reactive<{ show: Boolean, src: string, name: string }>({
  show: false,
  src: '',
  name: ''
})

onMounted(() => {
  const modelValue: FileResource = props.modelValue
  if (modelValue) {
    coverImg.show = true
    coverImg.src = "/" + modelValue.hash + "." + modelValue.suffix
  }
});

const divClick = () => {
  const ins = inputs.value as any
  ins.click()
}
const closeIcon = () => {
  const ins = inputs.value as any
  ins.value = ''
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