<template>
    <div class="card-div">
        <el-input v-model="tableData.keyword" class="keyword-class" placeholder="Please input" clearable />
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="$router.push('/postEdit')">新增</el-button>
    </div>
    <div class="card-div">
        <el-table :data="tableData?.content" :stripe="true" border :highlight-current-row="true" style="width: 100%"
            table-layout="auto">
            <el-table-column fixed prop="id" label="id" />
            <el-table-column prop="title" label="title" />
            <el-table-column prop="coverImg" label="coverImg" />
            <el-table-column prop="markdown" label="markdown" />
            <el-table-column prop="owner" label="owner" />
            <el-table-column prop="remark" label="remark" />
            <el-table-column prop="createTime" label="createTime" />
            <el-table-column label="operation">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click.prevent=" ">
                        修改
                    </el-button>
                    <el-button link type="primary" size="small" @click.prevent=" ">
                        详情
                    </el-button>
                </template>
            </el-table-column>
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
import { postReq } from "../common/request"
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
    const tv = tableData.value
    postReq.query({
        page: tv.page, pageSize: tv.pageSize, keyword: tv.keyword
    }).then(resp => {
        console.log(resp)
    })
}

</script>
  