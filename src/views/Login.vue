<template>
  <el-dialog v-model="dialogShow" title="登录">
    <el-form ref="formRef" :model="userInfo" label-width="4rem">
      <el-form-item prop="text" label="用户名" :rules="nickNameRule">
        <el-input v-model="userInfo.nickName" />
      </el-form-item>
      <el-form-item prop="password" label="密码" :rules="passwordRule">
        <el-input v-model="userInfo.password" type="password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm(userInfo)">登录</el-button>
        <el-button @click="toSignUp()"> 注册 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped></style>
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
const dialogShow = ref(true)
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
      Notification.error("登录失败", data.code + " ; " + data.message)
    } else {
      console.log(data.data.tokenValue)
      localStorage.setItem("satoken", data.data.tokenValue)
      dialogShow.value = false
      router.push("/home")
    }
  })
}

const toSignUp = () => {
  router.push("/signUp")

}

</script>
