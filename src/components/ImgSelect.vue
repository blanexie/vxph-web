<template>
    <img ref="imgRef" v-if="coverImg.show" class="coverClass" :src="coverImg.src" />
    <input type="file" @change="handleCoverImg" accept="image/jpg;image/png;image/jpeg" class="input-select" />
</template>
<style scoped >
.coverClass {
    height: 150px;
}
</style>
<script lang="ts" setup>
import { reactive } from 'vue';
import Notification from '../common/notification'
import { fileToBase64 } from '../common/util';

const coverImg = reactive<{ show: boolean, src: string }>({
    show: false,
    src: ''
})


const handleCoverImg = (element) => {
    const files = element.target.files
    fileToBase64(files[0], resp => {
        if (resp.status) {
            let imageBase64 = resp.data
            coverImg.show = true
            coverImg.src = imageBase64
        } else {
            Notification.error("封面选择失败，请重新选择")
            // element.target.files = []
        }
        console.log(resp)

    })
}



</script>