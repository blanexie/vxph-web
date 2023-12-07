<template>
    <div>
        <MdPreview class="edit" :modelValue="props.markdown"  :sanitize="sanitize"/>
        <MdCatalog :scrollElement="scrollElement" />
    </div>
</template>
<style scoped>
.edit {
    max-width: 1080px;
}
</style>
<script lang="ts" setup>

import { onMounted, watch, ref, toRefs } from 'vue';
import { baseServerURL } from '@/common/request';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import {fileToBase64, modifyHTML} from '@/common/util';
import 'md-editor-v3/lib/style.css';
const emit = defineEmits(['update:markdown'])
const props = defineProps(['markdown'])
const scrollElement = document.documentElement;

const sanitize = (html: string) => {
  console.log("sanitize", html)
  //处理其中的所有图片信息


  return html
}


</script>