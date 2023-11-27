import axios from 'axios'
import crypto from 'crypto-js'
import Notification from './notification'
import router from './route'


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
            console.log("to login", res.data)
            router.push("/login")
        } else if (code == 200) {
            return res.data
        } else {
            Notification.error("异常" + code, res.data.message)
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
    login: (userName, password) => {
        const timestamp = Date.now();
        const sign = String(crypto.SHA256(userName + "" + password + "" + timestamp))
        return instance.post("/api/user/login", {
            "username": userName,
            "time": timestamp,
            "pwdSha256": sign
        })
    },
    userInfo: () => {
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

const roleReq = {
    roleList: () => {
        return instance.get("/api/role/list")
    },
    save: (role) => {
        return instance.post("/api/role/save", role)
    },
    delete: (roleCode) => {
        return instance.get("/api/role/delete?roleCode=" + roleCode)
    },

}

const permissionReq = {
    list: (data) => {
        return instance.post("/api/permission/query", data)
    }
}

export { userReq, ddnsReq, roleReq, permissionReq }