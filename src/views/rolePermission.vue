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
    <h3>权限列表</h3>
    <br />

    <el-radio-group @change="pageChange(1)" v-model="rolePermission.filterType" label="label position">
      <el-radio-button label="all">全部</el-radio-button>
      <el-radio-button label="allow">有权限</el-radio-button>
      <el-radio-button label="notAllow">无权限</el-radio-button>
    </el-radio-group>
 
    <el-table :data="rolePermission.page" border style="width: 100%">
      <el-table-column prop="code" label="Code" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="type" label="Type" />

      <el-table-column label="Status">
        <template #default="scope">
          <el-tag v-if="scope.row.has" class="ml-2" type="success"> 已授权 </el-tag>
          <el-tag v-if="!scope.row.has" class="ml-2" type="warning"> 未授权 </el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="Operations">
        <template #default="scope">
          <el-button v-if="!scope.row.has" link type="primary" size="small" @click.prevent="allow(scope.row)">
            授权
          </el-button>
          <el-button v-if="scope.row.has" link type="primary" size="small" @click.prevent="notAllow(scope.row)">
            取消授权
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <br />
    <el-pagination background layout="prev, pager, next" @current-change="pageChange" :total="rolePermission.count" />

  </div>
</template>
<script setup lang="ts">
import { reactive, computed, ref, onMounted } from 'vue'
import { Role, Permission } from '@/common/class';
import { roleReq, permissionReq } from "@/common/request";
import { useRoute, useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

class PermissionExtend extends Permission {
  has: boolean | undefined
}
const route = useRoute()
const rolePermission = ref<{
  searchWord: string,
  role: Role,
  count: number,
  pageNo: number,
  filterType: string,
  page: PermissionExtend[],
  permissions: PermissionExtend[],
  allowPermission: PermissionExtend[],
}>({
  searchWord: "",
  count: 10,
  pageNo: 1,
  role: new Role(),
  filterType: "all",
  page: [],
  permissions: [],
  allowPermission: []
})

const notAllow = (pe: PermissionExtend) => {
  let rp = rolePermission.value
  rp.allowPermission = rp.allowPermission.filter(it => it.code !== pe.code)
  rp.permissions = rp.permissions.map(it => {
    if (it.code == pe.code) {
      it.has = false
    }
    return it
  })
  rp.role.permissions = rp.allowPermission

  roleReq.save(rp.role).then(resp => {
    rp.role = resp.data
  })
}

const allow = (pe: PermissionExtend) => {
  let rp = rolePermission.value
  rp.allowPermission.push(pe)
  pe.has = true
  rp.role.permissions = rp.allowPermission

  roleReq.save(rp.role).then(resp => {
    rp.role = resp.data
  })
}

const pageChange = (pageNo: number) => {
  let rp = rolePermission.value
  let codes = rp.allowPermission.map(it => it.code!)
  let filterType = rp.filterType
  let start = (pageNo - 1) * 10
  let end = (pageNo) * 10
  if (filterType == "all") {
    rp.count = rp.permissions.length
    rp.page = rp.permissions.slice(start, end)
  } else if (filterType == "allow") {
    rp.count = rp.allowPermission.length
    rp.page = rp.allowPermission.slice(start, end)
  } else if (filterType == "notAllow") {
    let fp = rp.permissions.filter(it => !codes.includes(it.code!))
    rp.count = fp.length
    rp.page = fp.slice(start, end)
  }
}

onMounted(() => {
  let rp = rolePermission.value
  let roleCode = route.query.roleCode
  roleReq.findByCode(roleCode).then(resp => {
    rp.role = resp.data as Role
  })
  roleReq.findPermissionByCode(roleCode).then(resp => {
    let pi = resp.data as Permission[]
    rp.allowPermission = pi.map(it => {
      let pe = convert(it)
      pe.has = true
      return pe
    })
    let codes = rp.allowPermission.map(it => it.code!)
    permissionReq.findAll().then(resp => {
      let pi = resp.data as Permission[]
      rp.permissions = pi.map(it => convertExentd(codes, it))
      rp.page = rp.permissions.slice(0, 10)
      rp.count = rp.permissions.length
    })
  })
})

const convert = (it: Permission): PermissionExtend => {
  let pe = new PermissionExtend()
  pe.code = it.code
  pe.createTime = it.createTime
  pe.description = it.description
  pe.name = it.name
  pe.status = it.status
  pe.type = it.type
  pe.updateTime = it.updateTime
  pe.versionNo = it.versionNo
  pe.has = false
  return pe
}

const convertExentd = (codes: string[], it: Permission): PermissionExtend => {
  let pe = convert(it)
  pe.has = codes.includes(it.code!!)
  return pe
}
</script>