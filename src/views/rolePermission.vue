<template>
  <div class="card-div">
    <el-descriptions border class="margin-top" title="角色信息" :column="3">
      <el-descriptions-item label="Code">{{ rolePermission?.role.code }}</el-descriptions-item>
      <el-descriptions-item label="Name">{{ rolePermission?.role.name }}</el-descriptions-item>
      <el-descriptions-item label="Description">{{ rolePermission?.role.description }}</el-descriptions-item>
      <el-descriptions-item label="CreateTime">{{ rolePermission?.role.createTime }}</el-descriptions-item>
      <el-descriptions-item label="UpdateTime">{{ rolePermission?.role.updateTime }}</el-descriptions-item>
      <el-descriptions-item label="Status">
        <el-tag v-if="rolePermission?.role.status == 0" class="ml-2" type="success">生效</el-tag>
        <el-tag v-if="rolePermission?.role.status == -1" class="ml-2" type="warning">失效</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>

  <div class="card-div">
    <h3>权限列表</h3> <br />
    <el-table :data="rolePermission.page" border style="width: 100%">
      <el-table-column prop="code" label="Code" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="type" label="type" />
      <el-table-column prop="description" label="Description" />
      <el-table-column prop="status" label="Status" />
      <el-table-column prop="createTime" label="CreateTime" />
      <el-table-column prop="updateTime" label="UpdateTime" />
    </el-table>
    <br />
    <el-pagination background layout="prev, pager, next" @current-change="pageChange"
      :total="rolePermission.permissions.length" />
  </div>
</template>
<script setup lang="ts">
import { reactive, computed, ref, onMounted } from 'vue'
import { Role, Permission } from '@/common/class';
import { roleReq, permissionReq } from "@/common/request";
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const rolePermission = ref<{
  role: Role,
  pageNo: number,
  page: Permission[],
  permissions: Permission[],
  allowPermission: Permission[],
}>({
  pageNo: 1,
  page: [],
  role: new Role(),
  permissions: [],
  allowPermission: []
})

const pageChange = (pageNo: number) => {
  let start = (pageNo - 1) * 10
  let end = pageNo * 10
  let rp = rolePermission.value
  rp.page = rp.permissions.slice(start, end)
}


onMounted(() => {
  let rp = rolePermission.value
  let roleCode = route.query.roleCode

  roleReq.findByCode(roleCode).then(resp => {
    rp.role = resp.data as Role
  })

  roleReq.findPermissionByCode(roleCode).then(resp => {
    rp.allowPermission = resp.data as Permission[]
  })

  permissionReq.findAll().then(resp => {
    rp.permissions = resp.data
    rp.page = rp.permissions.slice(0, 10)
  })

})


</script>