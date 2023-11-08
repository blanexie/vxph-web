<template>
    <el-button type="primary" @click="submitForm()">跳转DDNS</el-button>
</template>
<style scoped>

</style>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const submitForm = () => {
    router.push("/ddns")
}


</script>
  