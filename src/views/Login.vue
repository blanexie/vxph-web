<template>
  <el-card class="box-card" shadow="always">
    <el-form ref="formRef" :model="userInfo" label-width="4rem" >
      <el-form-item prop="text" label="用户名" :rules="nickNameRule">
        <el-input v-model="userInfo.nickName" />
      </el-form-item>
      <el-form-item prop="password" label="密码" :rules="passwordRule">
        <el-input v-model="userInfo.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(userInfo)">登录</el-button>
        <el-button @click="toSignUp()">注册</el-button>
      </el-form-item>
    </el-form></el-card>
</template>
<style scoped>
.box-card {
  padding: 2rem;
  width: 480px;
}
</style>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { loginReq } from '../axios/axios';

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

const userInfo = reactive<{
  password: string,
  nickName: string
}>({
  password: '',
  nickName: '',
})

const submitForm = (userInfo) => {
  loginReq.login(userInfo.nickName, userInfo.password).then(resp => {
    const data = resp.data
    if (data.code != 200) {

    }
    console.log(resp)
  })
}

const toSignUp = () => {


}

</script>
