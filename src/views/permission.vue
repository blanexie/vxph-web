<template>
    <div class="card-div">
        <el-table :data="tableData" :stripe="true" @row-click="rowClieck" :highlight-current-row="true" style="width: 100%"
            table-layout="auto">
            <el-table-column fixed prop="name" label="name" />
            <el-table-column prop="code" label="code" />
            <el-table-column prop="type" label="type" />
            <el-table-column prop="description" label="description" />
            <el-table-column prop="status" label="status" />
            <el-table-column prop="createTime" label="createTime" />
            <el-table-column prop="updateTime" label="updateTime" />
        </el-table>
        <br />
        <!-- <el-pagination background layout="prev, pager, next" :page-size="pageSize" :current-page="currentPage"
            :total="total" /> -->
        <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-size="pageSize" :page-count="totalPage" />
        <el-drawer v-model="drawerData.show" title="角色信息" size="500" direction="rtl">
            <el-form label-position="right" label-width="100px" :model="drawerData.rowData">
                <el-form-item label="修改">
                    <el-switch v-model="drawerData.editDisable" :inactive-value="true" :active-value="false" class="mb-2"
                        active-text="" />
                </el-form-item>
                <el-form-item label="code">
                    <el-input v-model="drawerData.rowData.code" :disabled="drawerData.rowData.type == 'Path'" />
                </el-form-item>
                <el-form-item label="name">
                    <el-input v-model="drawerData.rowData.name" :disabled="drawerData.editDisable" />
                </el-form-item>
                <el-form-item label="type">
                    <el-input v-model="drawerData.rowData.type" disabled />
                </el-form-item>
                <el-form-item label="description">
                    <el-input type="textarea" v-model="drawerData.rowData.description" :disabled="drawerData.editDisable" />
                </el-form-item>
                <el-form-item label="status">
                    <el-input v-model="drawerData.rowData.status" :disabled="drawerData.editDisable" />
                </el-form-item>
                <el-form-item label="updateTime">
                    <el-input v-model="drawerData.rowData.updateTime" disabled />
                </el-form-item>
                <el-form-item label="createTime">
                    <el-input v-model="drawerData.rowData.createTime" disabled />
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="drawerData.editDisable" type="primary">提交</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>

    </div>
</template>
<style scoped>
.card-div {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: px;
    background-color: #ffffff;
}
</style>

<script lang="ts" setup>
import { reactive, computed, ref, onMounted } from 'vue'
import { permissionReq } from "../common/axios"
import { Permission } from "../common/class"

const drawerData = ref<{
    rowData: Permission,
    show: boolean,
    editDisable: boolean,
}>({
    rowData: new Permission(),
    show: false,
    editDisable: true
})

let totalPage = ref(1)
const pageSize = ref(10)
const currentPage = ref(1)

const tableData = ref<Permission[]>([])


const rowClieck = (row: Permission) => {
    drawerData.value.rowData = row
    drawerData.value.show = true
    drawerData.value.editDisable = true
}
const handleCurrentChange = (cp) => {
    console.log(cp)
    permissionReq.list({ pageSize: pageSize.value, page: cp }).then(resp => {
        console.log(resp)
        let data = resp.data
        pageSize.value = data.size
        currentPage.value = data.number + 1
        totalPage.value = data.totalPages
        tableData.value = data.content
    })
}
onMounted(() => {
    handleCurrentChange(1)
})

</script>../common/axios