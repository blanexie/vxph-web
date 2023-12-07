<template>
    <el-select v-model="typeRef" @change="changeSelect" clearable placeholder="分类">
        <el-option v-for="item in typesRef" :key="item" :label="item" :value="item" />
    </el-select>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { codeReq } from '../common/request'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const typesRef = reactive<string[]>([])
const typeRef = ref<string>()

const changeSelect = (event: string) => {
    typeRef.value = event
    emit('update:modelValue', event)
}

onMounted(() => {
    typeRef.value = props.modelValue
    codeReq.findType("POST_TYPE").then((resp: any) => {
        const data = resp.data?.type
        const types = JSON.parse(data) as string[]
        types.forEach(it => {
            typesRef.push(it)
        })
    })
})
</script>