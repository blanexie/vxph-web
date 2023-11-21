<template>
  <div class="app">
    <el-container>
      <el-header class="header">Header</el-header>
      <el-container>
        <el-aside class="aside" width="200px">
          <Menu></Menu>
        </el-aside>
        <el-container>
          <el-main>
            <RouterView></RouterView>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
.app {
  background-color: #f2f4f7;
}

.header {
  height: 50px;
  background-color: white;
  border-bottom: 1px solid red;
  margin-bottom: 5px;
}

.aside {
  height: 100vh;
  background-color: #545c64;
}
</style>
<script lang="ts" setup>
import Menu from './components/menu.vue'
</script>