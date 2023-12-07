class User {
    id: Number
    name: string
    email: string
}


class Permission {
    code: string
    name: string
    description: string
    type: string
    status: number
    createTime: string
    updateTime: string
    versionNo: Number
}


class Role {
    id: number
    code: string
    name: string
    description: string
    permissions: Permission[]
    status: number
    createTime: string
    updateTime: string
    versionNo: Number
}


class Record {
    id: number
    recordId: string
    domainName: string
    rr: string
    type: string
    value: string
    ttl: string
    remark: string
    versionNo: Number
    status: Number
    updateTime: string
    createTime: string

}

class FileResource {
    hash: string
    name: string
    suffix: string  //文件的后缀，同时也是表示文件的类型，
    length: Number
    file: File
    base64: string
    url: string
    owner: Number
    status: Number
    updateTime: string
    createTime: string
    versionNo: Number
}

class Peer {
    id: Number
    infoHash: string
    passKey: string
    peerId: string
    ipv4: string
    ipv6: string
    port: Number
    downloaded: Number
    left: Number
    uploaded: Number
    event: string
    uploadTime: Date
    torrent: Torrent
    user: Number
    status: Number
    updateTime: string
    createTime: string
    versionNo: Number
}

class Label {
    id: Number
    code: string
    name: string
    type: string
    status: Number
    updateTime: string
    createTime: string
    versionNo: Number
}

class Post {
    id: Number
    title: string
    coverImg: FileResource
    imgs: FileResource[]
    owner: Number
    markdown: string
    torrentFiles: File[]
    torrents: Torrent[]
    type: string
    labels: Label[]
    remark: string
    status: Number
    updateTime: string
    createTime: string
    versionNo: Number
}

class Torrent {
    infoHash: string
    title: string  //用户命名的
    name: string  //torrent中的名称
    length: Number
    comment: string    // torrent中的注释
    files: string
    creationDate: Number  //秒时间戳
    createdBy: string
    pieceLength: Number
    singleFile: Boolean
    //complete – 目前做种人数
    complete: number
    //incomplete – 目前正在下载人数
    incomplete: number
    //downloaded – 曾经下载完成过的人数
    downloaded: number
    peer: Peer[]
    owner: Number
    post: Post

    status: Number
    updateTime: string
    createTime: string
    versionNo: Number
}

class TokenInfo {
    tokenName: string
    tokenValue: string
    isLogin: boolean
    loginId: string
    loginType: string
    tokenTimeout: string
    sessionTimeout: string
    tokenSessionTimeout: string
    tokenActiveTimeout: string
    loginDevice: string
    tag: any
}

export {Permission, Role, Record, Post, Torrent, FileResource, Peer, Label, TokenInfo}