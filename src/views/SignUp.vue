<template>
    <el-card class="box-card" shadow="always">
        <el-form ref="formRef" :model="userInfo" label-width="5rem">
            <el-form-item prop="text" label="用户名">
                <el-input v-model="userInfo.nickName" minlength="5" maxlength="16" placeholder="请输入你的用户名" />
            </el-form-item>
            <el-form-item prop="text" label="邮箱">
                <el-input v-model="userInfo.email" type="email" minlength="5" maxlength="16" placeholder="请输入注册邮箱" />
            </el-form-item>
            <el-form-item prop="text" label="邀请码">
                <el-input v-model="userInfo.inviteCode" minlength="5" maxlength="16" placeholder="请输入邮箱收到的邀请码" />
            </el-form-item>
            <el-form-item prop="password" label="密码" :rules="passwordRule">
                <el-input v-model="userInfo.password" type="password" minlength="6" maxlength="16" />
            </el-form-item>
            <el-form-item prop="password" label="重复密码" :rules="passwordRule">
                <el-input v-model="userInfo.repeatPassword" type="password" minlength="6" maxlength="16" />
            </el-form-item>
            <el-form-item prop="sex" label="性别">
                <el-radio-group v-model="userInfo.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(userInfo)">申请注册</el-button>
            </el-form-item>
        </el-form>
    </el-card>
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
        message: 'Please input nickName ',
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
    repeatPassword: string,
    nickName: string,
    email: string,
    inviteCode: string,
    sex: number
}>({
    password: '',
    nickName: '',
    repeatPassword: '',
    inviteCode: '',
    email: '',
    sex: 0
})

const submitForm = (userInfo) => {
    console.log(userInfo)
}

</script>
  