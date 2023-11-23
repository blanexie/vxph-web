<template>
    <div class="card-div">
        <el-table :data="tableData" :stripe="true" @row-click="rowClieck" :highlight-current-row="true" style="width: 100%"
            table-layout="auto">
            <!-- <el-table-column hidden prop="id" label="id" /> -->
            <el-table-column fixed prop="name" label="name" />
            <el-table-column prop="code" label="code" />
            <el-table-column prop="status" label="status" />
            <el-table-column prop="description" label="description" />
            <el-table-column prop="createTime" label="createTime" />
            <el-table-column prop="updateTime" label="updateTime" />
            <!-- <el-table-column prop="permissions" label="permissions" /> -->
        </el-table>


        <el-drawer v-model="drawerData.show" title="解析记录" size="700" direction="rtl">
            <el-form label-position="right" label-width="100px" :model="drawerData.rowData">
                <el-form-item label="修改">
                    <el-switch v-model="drawerData.editDisable" :inactive-value="true" :active-value="false" class="mb-2"
                        active-text="" />
                </el-form-item>
                <el-form-item label="code">
                    <el-input v-model="drawerData.rowData.code" disabled />
                </el-form-item>
                <el-form-item label="name">
                    <el-input v-model="drawerData.rowData.name" :disabled="drawerData.editDisable" />
                </el-form-item>
                <el-form-item label="description">
                    <el-input type="textarea" v-model="drawerData.rowData.description" :disabled="drawerData.editDisable" />
                </el-form-item>
                <el-form-item label="permissions">

                    

                    <el-table border :data="drawerData.rowData.permissions" :highlight-current-row="true">
                        <el-table-column prop="name" label="name" />
                        <el-table-column prop="code" label="code" />
                    </el-table> </el-form-item>
                <el-form-item>
                    <el-button :disabled="drawerData.editDisable" type="primary">提交</el-button>
                    <el-button :disabled="drawerData.editDisable" type="primary">加permission</el-button>
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
import { reactive, ref, onMounted } from 'vue'
import { roleReq } from "../axios/axios"

class Permission {
    code: string
    name: string
    description: string
    type: string
}

class Role {
    id: number
    code: string
    name: string
    description: string
    status: number
    createTime: string
    updateTime: string
    permissions: Array<Permission>
}

const drawerData = ref<{
    rowData: Role,
    show: boolean,
    editDisable: boolean,
}>({
    rowData: new Role(),
    show: false,
    editDisable: true
})

const tableData = ref<[Role]>()

const rowClieck = (row: Role) => {
    drawerData.value.rowData = row
    drawerData.value.show = true
    drawerData.value.editDisable = true
}

onMounted(() => {
    //获取所有的角色
    roleReq.roleList().then(resp => {
        console.log(resp)
        tableData.value = resp.data
    })

})

</script>