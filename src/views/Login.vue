<template>
  <el-dialog v-model="dialogShow" title="登录">
    <el-form ref="formRef" :model="userInfo" label-width="4rem">
      <el-form-item prop="text" label="用户名" :rules="nickNameRule">
        <el-input v-model="userInfo.nickName"/>
      </el-form-item>
      <el-form-item prop="password" label="密码" :rules="passwordRule">
        <el-input v-model="userInfo.password" type="password"/>
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
import {reactive, ref} from 'vue'
import {userReq} from '../common/request';
import Notification from "../common/notification";
import router from "../common/route";
import {TokenInfo} from '../common/class';

const passwordRule = {
  required: true,
  message: 'password can not be null',
  trigger: ['blur'],
}
const nickNameRule = [
  {
    required: true,
    message: 'Please input  nickName  ',
    trigger: ['blur', "change"],
  }
]
const dialogShow = ref(true)

interface UserInfo {
  password: string,
  nickName: string
}

const userInfo = reactive<UserInfo>({
  password: '',
  nickName: '',
})

const submitForm = (userInfo: UserInfo) => {
  userReq.login(userInfo.nickName, userInfo.password).then((resp: any) => {
    let code = resp.code
    if (code != 200) {
      Notification.error("登录失败", code + " ; " + resp.message)
    } else {
      const data = resp.data as TokenInfo
      console.log(data)
      localStorage.setItem("tokenInfo", JSON.stringify(data))
      dialogShow.value = false
      router.back()
    }
  })
}

const toSignUp = () => {
  router.push("/signUp")
}

</script>
