<template>
  <div class="card-div">

    <br>
    <el-button type="primary" @click.prevent="addRoleDrawerShow">
      新增角色
    </el-button>
  </div>
  <div class="card-div">
    <br>
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
          <el-button link type="primary" size="small" @click.prevent="deleteRole(scope.row.code)">
            删除
          </el-button>
          <el-button link type="primary" size="small" @click.prevent="updateRoleDrawerShow(scope.row)">
            修改
          </el-button>
          <el-button link type="primary" size="small" @click.prevent="updatePermission(scope.row)">
            授权
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer v-model="drawerData.show" title="角色信息" @close="drawerDataClose" size="500" direction="rtl">
      <el-form label-position="right" label-width="100px" :model="drawerData.rowData">
        <el-form-item label="修改">
          <el-switch v-model="drawerData.editDisable" :inactive-value="true" :active-value="false" class="mb-2"
            active-text="" />
        </el-form-item>
        <el-form-item label="code">
          <el-input v-model="drawerData.rowData.code" :disabled="drawerData.codeEditDisable" />
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
          <el-button :disabled="drawerData.editDisable" @click="addRoleDrawer(drawerData.rowData)" type="primary">提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

  </div>
</template>
<style scoped>
.w-50 {
  width: 450px;
}
</style>
<script lang="ts" setup>
import { reactive, computed, ref, onMounted } from 'vue'
import { roleReq, permissionReq } from "../common/request"
import { duplicate } from '../common/util';
import { Role, Permission } from '../common/class';
import router from '@/common/route';


const drawerPermission = ref<{
  role: Role,
  permissions: [],
  pageContent: [],
  page: Number,
  pageSize: Number,
  totalPage: Number,
  show: boolean,
  selectPermissionCodes: String[],
  searchPermissions: Permission[],
  selectloading: boolean,
  copyRole: String,
  editDisable: boolean,
}>({
  role: new Role(),
  copyRole: "",
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
  codeEditDisable: boolean,
  show: boolean,
  editDisable: boolean,
}>({
  rowData: new Role(),
  show: false,
  codeEditDisable: true,
  editDisable: true
})

const tableData = ref<Role[]>([])

const deleteRole = (roleCode: string) => {
  roleReq.delete(roleCode).then(resp => {
    if (resp) {
      tableData.value = tableData.value.filter(it => it.code != roleCode)
    }
  })
}
const updateRoleDrawerShow = (row: Role) => {
  drawerData.value.rowData = row
  drawerData.value.show = true
  drawerData.value.editDisable = true
}
const drawerDataClose = () => {
  const dd = drawerData.value
  dd.codeEditDisable = true
}
//新增角色抽屉显示
const addRoleDrawerShow = () => {
  const dd = drawerData.value
  dd.editDisable = false
  dd.show = true
  dd.codeEditDisable = false
  dd.rowData = new Role()
}
const addRoleDrawer = (role: Role) => {
  const dd = drawerData.value
  role.permissions = []
  saveRole(role, (it: any) => {
    dd.editDisable = true
    dd.codeEditDisable = true
    tableData.value.push(it.data)
  })
}

const saveRole = (role: Role, func: Function) => {
  const dp = drawerPermission.value
  roleReq.save(role).then(resp => {
    if (resp) {
      dp.role.versionNo = resp.data.versionNo
      dp.role.permissions = resp.data.permissions
      dp.role.updateTime = resp.data.updateTime
      func(resp)
    } else {
      console.log("修改结束11", resp)
    }
  })
}

const updatePermission = (row: any) => {
  router.push("/rolePermission?roleCode=" + row.code)
}

onMounted(() => {
  //获取所有的角色
  roleReq.roleList().then(resp => {
    tableData.value = resp?.data
  })

})

</script>../common/axios