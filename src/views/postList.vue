<template>
    <div class="card-div">
        <el-input v-model="tableData.keyword" class="keyword-class" placeholder="Please input" clearable />
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="$router.push('/postEdit')">新增</el-button>
    </div>
    <div class="card-div">
        <div v-for="item in tableData?.content">
            <PostItem :post="item"></PostItem>
        </div>
    </div>

    <div class="card-div">

        <el-table :data="tableData?.content" :stripe="true" border :highlight-current-row="true" style="width: 100%"
            table-layout="auto">
            <el-table-column fixed prop="id" label="id" />
            <el-table-column prop="title" label="title" />
            <el-table-column prop="coverImg.url" label="coverImg" />
            <el-table-column label="labels">
                <template #default="scope">
                    <el-tag class="ml-2" v-for="item in  scope.row.labels" type="success">{{ item.name }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="owner" label="owner" />
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

</style>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { postReq } from "../common/request"
import { Post } from "../common/class"
import PostItem from '../components/PostItem.vue'
import { isYieldExpression } from '@babel/types';

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
    const reqData = {
        page: tv.page, pageSize: tv.pageSize, keyword: tv.keyword
    }
    postReq.query(reqData).then(resp => {
        tv.content = resp.data.postPage.content
        tv.totalPage = resp.data.postPage.totalPages
        const torrents = resp.data.torrents

        tv.content.forEach(it => {
            it.torrents = torrents.filter(t => t.postId == it.id)
            console.log(it)
        })
    })
}
onMounted(() => {
    search()
})

</script>
  