import axios from 'axios'
import crypto from 'crypto-js'
import Notification from './notification.js'
import {FileResource, Post, Role, TokenInfo} from './class'


const baseServerURL = 'http://127.0.0.1:8018'

const instance = axios.create({
    baseURL: baseServerURL,
    timeout: 100000,
});

instance.interceptors.response.use(
    (resp) => {
        let code = resp.data.code
        if (code === 625) {
            Notification.error("权限不足", resp.data.message)
        } else if (code == 403) {
            window.location.href = "/login"
        } else if (code == 200) {
            return resp.data
        } else {
            Notification.error("异常" + code, resp.data.message)
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.request.use(
    (config) => {
        const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo")) as TokenInfo
        if (tokenInfo) {
            config.headers[tokenInfo.tokenName] = tokenInfo.tokenValue
        }
        return config;
    }, (error) => {
        return Promise.reject(error)
    }
);

const userReq = {
    login: (userName: string, password: string) => {
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
    save: (role: Role) => {
        return instance.post("/api/role/save", role)
    },
    delete: (roleCode: string) => {
        return instance.get("/api/role/delete?roleCode=" + roleCode)
    },

}

const permissionReq = {
    list: (data: any) => {
        return instance.post("/api/permission/query", data)
    }
}

const postReq = {
    query: (data: any) => {
        return instance.post("/api/post/query", data)
    },
    save: (post: Post) => {
        return instance.post("/api/post/save", post)
    },
    findById: (id: any) => {
        return instance.get("/api/post/findById?id=" + id)
    }
}

const labelReq = {
    list: () => {
        return instance.get("/api/label/list")
    }
}

const fileResourceReq = {
    upload: async (fileResource: FileResource) => {
        let formData = new FormData();
        formData.append("hash", fileResource.hash);
        formData.append("file", fileResource.file);
        return instance.post("/api/resource/upload", formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    }
}

const torrentReq = {
    upload: async (postId: string, torrent: File) => {
        let formData = new FormData();
        formData.append("postId", postId);
        formData.append("file", torrent);
        formData.append("title", torrent.name)
        return instance.post("/api/torrent/upload", formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    }
}

export {baseServerURL, userReq, ddnsReq, roleReq, permissionReq, postReq, labelReq, fileResourceReq, torrentReq}