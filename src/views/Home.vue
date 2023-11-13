<template>
    <div class="common-layout">
        <el-container>
            <el-aside class="aside" width="200px">
                <Menu></Menu>
            </el-aside>
            <el-container>
                <el-header class="header">Header</el-header>
                <el-main> <el-button type="primary" @click="submitForm()">跳转DDNS</el-button></el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style scoped>
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
import { useRouter } from 'vue-router'
import Menu from '../components/menu.vue'
const router = useRouter()

const submitForm = () => {
    router.push("/ddns")
}


</script>
  