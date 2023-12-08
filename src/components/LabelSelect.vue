<template>
  <el-select class="Tag" v-model="tagValue" multiple @change="changeLabelSelect" clearable placeholder="标签">
    <el-option v-for="item in tagLabels" :key="item.id" :label="item.name" :value="item.code"/>
  </el-select>
</template>
<style scoped></style>
<script lang="ts" setup>
import {labelReq} from '@/common/request';
import {onMounted, reactive, ref} from 'vue';
import {Label} from '@/common/class'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const tagValue = ref<String[]>([])
const tagLabels = reactive<Label[]>([])

const changeLabelSelect = () => {
  let labels = Array<Label>()
  tagLabels.filter(it => tagValue.value.indexOf(it.code) > -1).forEach(it => {
    labels.push(it)
  })
  emit('update:modelValue', labels)
}

onMounted(() => {
  //初始化数据
  let labels = props.modelValue
  labels?.forEach((element: Label) => {
    tagValue.value.push(element.code)
  });

  //请求全量数据
  labelReq.list().then((resp: any) => {
    let labels = resp.data
    labels?.forEach((element: Label) => {
      tagLabels.push(element)
    });
  })

})


</script>