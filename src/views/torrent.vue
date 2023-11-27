<template>
    <div class="card-div">
        <el-input v-model="tableData.keyword" class="keyword-class" placeholder="Please input" clearable />
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="search">新增</el-button>
    </div>
    <div class="card-div">
        <el-table :data="tableData?.content" :stripe="true" border :highlight-current-row="true" style="width: 100%"
            table-layout="auto">
            <el-table-column fixed prop="id" label="id" />
            <el-table-column prop="title" label="title" />
            <el-table-column prop="coverImg" label="coverImg" />
            <el-table-column prop="markdown" label="markdown" />
            <el-table-column prop="owner" label="owner" />
            <el-table-column prop="imgs" label="imgs" />
            <el-table-column prop="torrents" label="torrents" />
            <el-table-column prop="remark" label="remark" />

            <el-table-column prop="status" label="status" />
            <el-table-column prop="updateTime" label="updateTime" />
            <el-table-column prop="createTime" label="createTime" />
        </el-table>
    </div>
</template>
<style scoped>
.keyword-class {
    margin: 10px;
    width: 400px;

}

.card-div {
    margin-bottom: 10px;
    padding: 20px;
    border-radius: px;
    background-color: #ffffff;
}
</style>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { ddnsReq } from "../common/axios"
import { Post } from "../common/class"

const tableData = ref<{
    content: Post[],
    page: Number,
    pageSize: Number,
    totalPage: Number,
    keyword: String,

}>({
    content: [],
    page: 1,
    pageSize: 10,
    totalPage: 1,
    keyword: ""
})

const search = () => {

}

</script>
  