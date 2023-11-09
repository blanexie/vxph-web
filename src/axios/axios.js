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
    console.log(response.data)
    return response.data;
}, function (error) {
    console.log("-----------", error)
    return Promise.reject(error);
});


instance.interceptors.request.use((config) => {
    if (sessionStorage.getItem("token") == null) {
        router.push("/login")
        return null;
    }
    const time = localStorage.getItem("time")
    try {
        console.log("timetimetime",time)
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        config.headers.token = localStorage.getItem("token")
        config.headers.time = time
        config.headers.userId = userInfo.id
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
        const sign = crypto.SHA256(userName + "&" + password + "&" + timestamp)
        console.log(sign);
        return instance.get("/user/login?nickName=" + userName + "&timestamp=" + timestamp + "&sign=" + sign)
    }
}

const ddnsReq = {

    findLocalIp: function () {
        return instance.get("/ddns/findLocalIp")
    },

    findDomainRecords: function () {
        return instance.get("/ddns/findDomainRecords")
    }

}


export { userReq, ddnsReq }