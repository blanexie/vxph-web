<template>
  <div>
    <p v-if="coverImg.show" class="imgshow">
      <vx-image fit="fill" class="coverClass" :src="coverImg.src"></vx-image>
      <el-tag @close="tagClose" closable>{{ coverImg.name }}</el-tag>
    </p>

    <div class="input-file-button" v-if="!coverImg.show" @click="divClick">
      <div class="ccc">
        <el-icon class="plus">
          <Plus />
        </el-icon>
        <div>添加封面图片</div>
      </div>
    </div>

    <input type="file" ref="inputs" @change="handleCoverImg" style="display: none;" accept="image/*"
      class="input-select" />

  </div>
</template>
<style scoped>
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
import { reactive, ref, onMounted } from 'vue';
import Notification from '@/common/notification'
import { fileToBase64 } from '@/common/util';
import { FileResource } from '@/common/class';
import { Plus } from '@element-plus/icons-vue'
import VxImage from './VxImage.vue';

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
  inputs.value?.click();
}

const tagClose = (e) => {
  coverImg.src = ''
  coverImg.show = false
  coverImg.name = ''
  emit('update:modelValue', null)
}

const handleCoverImg = (element) => {
  const files = element.target.files
  fileToBase64(files[0], (resp: FileResource) => {
    if (resp.base64 != "") {
      coverImg.show = true
      coverImg.src = resp.base64
      coverImg.name = resp.name
      emit('update:modelValue', resp)
    } else {
      Notification.error("", "封面选择失败，请重新选择")
    }
  })
}


</script>