import axios from 'axios'
import crypto from 'crypto-js'
import Notification from '../common/notification'
import { useRouter } from 'vue-router'


const instance = axios.create({
    baseURL: 'http://localhost:8018',
    timeout: 30000,
});


const router = useRouter()
axios.interceptors.response.use(function (response) {
    console.log("-----------", response.data)
    let code = response.data.code
    if (code == 625) {
        router.push("/login")
    }
    return response.data;
}, function (error) {
    console.log("-----------", error)
    return Promise.reject(error);
});


instance.interceptors.request.use((config) => {
    try {
        const satoken = localStorage.getItem("satoken")
        config.headers.satoken = satoken
    } catch (e) {
    }
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

const userReq = {
    login: function (userName, password) {
        const timestamp = Date.now();
        const sign = String(crypto.SHA256(userName + "" + password + "" + timestamp))
        console.log(sign);
        return instance.post("/api/user/login", {
            "username": userName,
            "time": timestamp,
            "pwdSha256": sign
        })
    }
}

const ddnsReq = {
    findLocalIp: function () {
        return instance.get("/api/ddns/ips")
    },

    findDomainRecords: function () {
        return instance.get("/api/ddns/findRecords")
    }

}


export { userReq, ddnsReq }