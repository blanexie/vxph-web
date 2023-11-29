<template>
    <div>
        <p v-if="coverImg.show">
            <img class="coverClass" :src="coverImg.src" /> &nbsp;&nbsp;
        </p>
        <input type="file" @change="handleCoverImg" accept="image/jpg;image/png;image/jpeg" class="input-select" />
    </div>
</template>
<style scoped >
.coverClass {
    height: 150px;
    border: 1px #dcdfe6 solid;
}
</style>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import Notification from '../common/notification'
import { fileToBase64 } from '../common/util';
import { baseServerURL } from '../common/axios'
import { FileResource } from '../common/class';

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

onMounted(() => {
    const modelValue: FileResource = props.modelValue
    if (modelValue) {
        coverImg.src = baseServerURL + "/" + modelValue.hash + "." + modelValue.suffix
    }
});

const coverImg = reactive<{ show: Boolean, src: string }>({
    show: false,
    src: ''
})

const handleCoverImg = (element) => {
    const files = element.target.files
    console.log(files[0])
    fileToBase64(files[0], (resp: FileResource) => {
        if (resp.base64 != "") {
            coverImg.show = true
            coverImg.src = resp.base64
            emit('update:modelValue', resp)
        } else {
            Notification.error("封面选择失败，请重新选择")
        }
    })
}



</script>