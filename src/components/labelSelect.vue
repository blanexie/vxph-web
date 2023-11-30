<template>
    <div class="body">
        <el-select class="Category" v-model="categoryValue" @change="changeModelValue" clearable placeholder="分类">
            <el-option v-for="item in categoryLabels" :key="item.id" :label="item.name" :value="item.code" />
        </el-select>
        <el-select class="Tag" v-model="tagValue" multiple @change="changeModelValue" clearable placeholder="标签">
            <el-option v-for="item in tagLabels" :key="item.id" :label="item.name" :value="item.code" />
        </el-select>
    </div>
</template>
<style scoped>
.Category {
    width: 100px;
    margin-right: 10px;
}

.Tag {
    width: 450px;
}
</style>
<script lang="ts" setup>
import { labelReq } from '../common/request';
import { onMounted, reactive, ref } from 'vue';
import { Label } from '../common/class'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const tagValue = ref<String[]>([])
const tagLabels = reactive<Label[]>([])


const categoryValue = ref<String>()
const categoryLabels = reactive<Label[]>([])

const changeModelValue = (element) => {
    let labels = Array<Label>()
    tagLabels.filter(it => tagValue.value.indexOf(it.code) > -1).forEach(it => {
        labels.push(it)
    })
    categoryLabels.filter(it => categoryValue.value == it.code).forEach(it => {
        labels.push(it)
    })
    emit('update:modelValue', labels)
}

onMounted(() => {
    //初始化数据
    let labels = props.modelValue
    labels?.filter((it: Label) => it.type == 'Category').forEach((element: Label) => {
        categoryValue.value = element.code
    });
    labels?.filter((it: Label) => it.type == 'Tag').forEach((element: Label) => {
        tagValue.value.push(element.code)
    });

    //请求全量数据
    labelReq.list().then(resp => {
        console.log(resp)
        let labels = resp.data
        labels?.filter((it: Label) => it.type == 'Category').forEach((element: Label) => {
            categoryLabels.push(element)
        });
        labels?.filter((it: Label) => it.type == 'Tag').forEach((element: Label) => {
            tagLabels.push(element)
        });
    })

})



</script>