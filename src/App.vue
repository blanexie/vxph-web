<template>
  <div class="app">
    <el-container>
      <el-header>
        <Menu></Menu>
      </el-header>
      <el-main class>
          <RouterView></RouterView>
      </el-main>
    </el-container>
  </div>
</template>
<style scoped>
.app {
  background-color: #f2f4f7;
}
.el-main{
  width: 1200px;
  text-align: center;
  margin: auto;
  min-height: 100vh;

}
</style>
<script lang="ts" setup>
import Menu from './components/menu.vue'
</script>