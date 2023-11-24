<template>
    <div class="card-div">
        <el-table :data="tableData" :stripe="true" border :highlight-current-row="true" style="width: 100%"
            table-layout="auto">
            <el-table-column fixed prop="name" label="name" />
            <el-table-column prop="code" label="code" />
            <el-table-column prop="description" label="description" />
            <el-table-column prop="status" label="status" />
            <el-table-column prop="createTime" label="createTime" />
            <el-table-column prop="updateTime" label="updateTime" />
            <el-table-column label="operation">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click.prevent="rowClick(scope.row)">
                        修改
                    </el-button>
                    <el-button link type="primary" size="small" @click.prevent="updatePermission(scope.row)">
                        授权
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-drawer v-model="drawerData.show" title="角色信息" size="500" direction="rtl">
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
                <el-form-item label="status">
                    <el-input v-model="drawerData.rowData.status" :disabled="drawerData.editDisable" />
                </el-form-item>
                <el-form-item label="createTime">
                    <el-input v-model="drawerData.rowData.createTime" disabled />
                </el-form-item>
                <el-form-item label="updateTime">
                    <el-input v-model="drawerData.rowData.updateTime" disabled />
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="drawerData.editDisable" type="primary">提交</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>

        <el-drawer v-model="drawerPermission.show" title="授权" size="600" direction="rtl">
            <div> 角色:{{ drawerPermission.role.name }} </div>
            <div>
                <el-select class="w-50" v-model="drawerPermission.selectPermissionCodes" multiple filterable remote
                    reserve-keyword placeholder="Please enter a keyword" remote-show-suffix
                    :remote-method="searchRemotePermission" :loading="drawerPermission.selectloading">
                    <el-option v-for="item in drawerPermission.searchPermissions" :key="item.code" :label="item.name"
                        :value="item.code" />
                </el-select>

                <el-button type="primary"
                    @click="addRolePermission(drawerPermission.role, drawerPermission.selectPermissionCodes)">添加</el-button>
            </div>
            <div>包含的权限： </div>
            <el-table :data="drawerPermission.role.permissions" border :stripe="true" :highlight-current-row="true"
                style="width: 100%" table-layout="auto">
                <el-table-column fixed prop="name" label="name" />
                <el-table-column prop="code" label="code" />
                <el-table-column prop="type" label="type" />
            </el-table>
        </el-drawer>
    </div>
</template>
<style scoped>
.w-50 {
    width: 450px;
}

.card-div {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: px;
    background-color: #ffffff;
}
</style>
<script lang="ts" setup>
import { reactive, computed, ref, onMounted } from 'vue'
import { roleReq, permissionReq } from "../common/axios"
import { duplicate } from '../common/util';
import { Role, Permission } from '../common/class';


const drawerPermission = ref<{
    role: Role,
    permissions: [],
    pageContent: [],
    page: Number,
    pageSize: Number,
    totalPage: Number,
    show: boolean,
    selectPermissionCodes: Array<String>,
    searchPermissions: Array<Permission>,
    selectloading: boolean,
    editDisable: boolean,
}>({
    role: new Role(),
    permissions: [],
    pageContent: [],
    page: 1,
    pageSize: 10,
    totalPage: 1,
    show: false,
    searchPermissions: [],
    selectPermissionCodes: [],
    selectloading: false,
    editDisable: true
})

const drawerData = ref<{
    rowData: Role,
    show: boolean,
    editDisable: boolean,
}>({
    rowData: new Role(),
    show: false,
    editDisable: true
})

const tableData = ref<Role[]>([])
const rowClick = (row: Role) => {
    drawerData.value.rowData = row
    drawerData.value.show = true
    drawerData.value.editDisable = true
}

const addRolePermission = (role: Role, selectPermissionCodes: String[]) => {
    //校验传入的参数是否空
    if (selectPermissionCodes.length === 0) {
        return
    }
    let dp = drawerPermission.value
    let selects = dp.searchPermissions.filter(it => selectPermissionCodes.includes(it.code))
    role.permissions = duplicate([...selects, ...role.permissions], it => it.code)
    roleReq.save(role).then(resp => {
        if (resp) {
            dp.selectPermissionCodes = []
            dp.role.versionNo = resp.data.versionNo
            dp.role.permissions = resp.data.permissions
            dp.role.updateTime = resp.data.updateTime
        } else {
            console.log("修改结束11", resp)
        }
    })
}

const searchRemotePermission = (query: string) => {
    permissionReq.list({ page: 1, pageSize: 10, searchKey: query })
        .then(resp => {
            drawerPermission.value.searchPermissions = resp.data.content
            drawerPermission.value.selectloading = false
        })
}

const updatePermission = (row) => {
    drawerPermission.value.role = row
    drawerPermission.value.show = true
    drawerPermission.value.editDisable = true
}

onMounted(() => {
    //获取所有的角色
    roleReq.roleList().then(resp => {
        tableData.value = resp?.data
    })

})

</script>../common/axios