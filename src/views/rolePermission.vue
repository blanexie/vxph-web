<template>
  <div class="card-div">
    <el-descriptions
        class="margin-top"
        title="Without border"
        :column="3"
    >
      <el-descriptions-item label="code">kooriookami</el-descriptions-item>
      <el-descriptions-item label="name">18100000000</el-descriptions-item>
      <el-descriptions-item label="description">Suzhou</el-descriptions-item>
      <el-descriptions-item label="createTime">Suzhou</el-descriptions-item>
      <el-descriptions-item label="updateTime">Suzhou</el-descriptions-item>
      <el-descriptions-item label="status">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address"
      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>
  </div>

  <div class="card-div">

  </div>
</template>
<script setup lang="ts">
import {reactive, computed, ref, onMounted} from 'vue'
import {Role, Permission} from '@/common/class';


const role = reactive<{
  role:Role,
  allowPermissions:Permission[],


}>(null)


onMounted(() => {


})


</script>