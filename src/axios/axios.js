import axios from 'axios'
import crypto from 'crypto-js'
import Notification from '../common/notification'
import router from '../route/route'


const instance = axios.create({
    baseURL: 'http://localhost:8018',
    timeout: 100000,
});

instance.interceptors.response.use(
    (res) => {
        console.log("instance.interceptors.response", res.data)
        let code = res.data.code
        if (code === 625) {
            Notification.error("权限不足", res.data.message)
        } else if (code == 403) {
            router.push("/login")
        } else {
            return res.data
        }
    },
    (error) => {
        return Promise.reject(error);
    }
)

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
        return instance.post("/api/user/login", {
            "username": userName,
            "time": timestamp,
            "pwdSha256": sign
        })
    },
    userInfo: function () {
        return instance.get("/api/user/info")
    }
}

const ddnsReq = {
    findLocalIp: function () {
        return instance.get("/api/ddns/ips")
    },

    findDomainRecords: function () {
        return instance.get("/api/ddns/findRecords")
    },
    updateRecord: function (rowdata) {
        return instance.post("/api/ddns/updateRecord", rowdata)
    }
    
}


export { userReq, ddnsReq }