<template>
  <el-form ref="formRef" :model="userInfo" label-width="4rem" class="demo-dynamic">
    <el-form-item prop="text" label="用户名" :rules="nickNameRule">
      <el-input v-model="userInfo.nickName" />
    </el-form-item>
    <el-form-item prop="password" label="密码" :rules="passwordRule">
      <el-input v-model="userInfo.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(userInfo)">登录</el-button>
      <el-button @click="resetForm(formRef)">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped>
.demo-dynamic {
  width: 25rem;
  background-color: rgb(250, 250, 250);
  padding: 2rem;
  border: 1px black solid;
  border-radius: 1rem;
}
</style>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { loginReq } from '../axios/axios';
import type { FormInstance } from 'element-plus'

const passwordRule = {
  required: true,
  message: 'domain can not be null',
  trigger: 'blur',
}
const nickNameRule = [
  {
    required: true,
    message: 'Please input  nickName  ',
    trigger: 'blur',
  },
  {
    type: 'text',
    message: 'Please input correct nickName',
    trigger: ['blur', 'change'],
  },
]

const formRef = ref<FormInstance>()
const userInfo = reactive<{
  password: string,
  nickName: string
}>({
  password: '',
  nickName: '',
})


const submitForm = (userInfo) => {
  loginReq.login(userInfo.nickName,userInfo.password).then(resp=>{


  })

}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
