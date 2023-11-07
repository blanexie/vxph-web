<template>
  <el-card class="box-card" shadow="always">
    <el-form ref="formRef" :model="userInfo" label-width="4rem">
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
import { userReq } from '../axios/axios';
import Notification from '../common/notification'
import { useRouter } from 'vue-router'

const router = useRouter()

const passwordRule = {
  required: true,
  message: 'password can not be null',
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
  userReq.login(userInfo.nickName, userInfo.password).then(resp => {
    const data = resp.data
    console.log(resp)
    if (data.code != 200) {
      Notification.error("登录失败", data.code + " ; " + data.error)
    }else{
        sessionStorage.setItem("token", data.body.token)
        sessionStorage.setItem("userInfo", data.body.userInfo)
        sessionStorage.setItem("account", data.body.account)
        router.push("/home")
    }
  })
}

const toSignUp = () => {
  router.push("/signUp")

}

</script>
