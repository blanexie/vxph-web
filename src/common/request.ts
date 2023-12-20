import axios from 'axios'
import crypto from 'crypto-js'
import { FileResource, Post, Role, TokenInfo } from './class'
import { ElNotification } from "element-plus";


const baseServerURL = 'http://127.0.0.1:8018'

const instance = axios.create({
    baseURL: baseServerURL,
    timeout: 100000,
});

instance.interceptors.response.use(
    (resp) => {
        let code = resp.data.code
        if (code === 625) {
            ElNotification.error({ title: "权限不足", message: resp.data.message })
        } else if (code == 403) {
            window.location.href = "/login"
        } else if (code == 200) {
            return resp.data
        } else {
            ElNotification.error({ title: "异常" + code, message: resp.data.message })
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("tokenInfo")
        if (token) {
            const tokenInfo = JSON.parse(token) as TokenInfo
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

    findRecords: function () {
        return instance.get("/api/ddns/findRecords")
    },
    addOrUpdate: function (rowdata: any) {
        return instance.post("/api/ddns/addOrUpdate", rowdata)
    },
    syncRecord: function (id: number | undefined) {
        return instance.get("/api/ddns/syncAliyunRecord?id=" + id)
    },
    downRecord: function (recordId: string | undefined) {
        return instance.get("/api/ddns/downloadAliyunRecord?recordId=" + recordId)
    },
    deleteRecord: function (recordId: string | undefined) {
        return instance.get("/api/ddns/deleteRecord?recordId=" + recordId)
    },
    deleteAliyunRecord: function (recordId: string | undefined) {
        return instance.get("/api/ddns/deleteAliyunRecord?recordId=" + recordId)
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
    findByCode(code: any) {
        return instance.get("/api/role/findByCode?code=" + code)
    },
    findPermissionByCode(roleCode: any) {
        return instance.get("/api/role/findPermissions?roleCode=" + roleCode)
    }

}

const permissionReq = {
    list: (data: any) => {
        return instance.post("/api/permission/query", data)
    },
    findAll: () => {
        return instance.get("/api/permission/findAll")
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
            headers: { 'Content-Type': 'multipart/form-data' }
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
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
}


const codeReq = {
    findType: (code: string) => {
        return instance.get("/api/code/type?code=" + code)
    }
}


export {
    baseServerURL,
    userReq,
    ddnsReq,
    roleReq,
    permissionReq,
    postReq,
    labelReq,
    fileResourceReq,
    torrentReq,
    codeReq
}