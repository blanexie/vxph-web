<template>
  <div class="card-div">
    <el-descriptions border class="margin-top" title="角色信息" :column="3">
      <el-descriptions-item label="Code">{{ rolePermission?.role.code }}</el-descriptions-item>
      <el-descriptions-item label="Name">{{ rolePermission?.role.name }}</el-descriptions-item>
      <el-descriptions-item label="Description">{{ rolePermission?.role.description }}</el-descriptions-item>
      <el-descriptions-item label="CreateTime">{{ rolePermission?.role.createTime }}</el-descriptions-item>
      <el-descriptions-item label="UpdateTime">{{ rolePermission?.role.updateTime }}</el-descriptions-item>
      <el-descriptions-item label="Status"> {{ rolePermission?.role.status }}</el-descriptions-item>
    </el-descriptions>
  </div>

  <div class="card-div">
    <el-table :data="rolePermission.permissions" border style="width: 100%">
      <el-table-column prop="dacodete" label="Code" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="type" label="type" />
      <el-table-column prop="description" label="Description" />
      <el-table-column prop="status" label="Status" />
      <el-table-column prop="createTime" label="CreateTime" />
      <el-table-column prop="updateTime" label="UpdateTime" />
    </el-table>
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
  permissions: Permission[],
  allowPermission: Permission[],
}>({
  role: new Role(),
  permissions: [],
  allowPermission: []
})


onMounted(() => {
  let rp = rolePermission.value
  let roleCode = route.query.roleCode
  roleReq.findByCode(roleCode).then(resp => {
    rp.role = resp.data as Role
  })

  roleReq.findPermissionByCode(roleCode).then(resp => {
    rp.allowPermission = resp.data as Permission[]
  })

})


</script>