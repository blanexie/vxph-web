
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
    versionNo: Number

}

class FileResource {
    hash: String
    name: String
    suffix: String  //文件的后缀，同时也是表示文件的类型，
    length: Number
    owner: User
    status: Number
    updateTime: string
    createTime: string
    versionNo: Number
}

class Peer {
    id: Number
    infoHash: String
    passKey: String
    peerId: String
    ipv4: String
    ipv6: String
    port: Number
    downloaded: Number
    left: Number
    uploaded: Number
    event: String
    uploadTime: Date
    torrent: Torrent
    user: User
    status: Number
    updateTime: string
    createTime: string
    versionNo: Number
}

class Label {
    id: Number
    code: String
    name: String
    type: String
    status: Number
    updateTime: string
    createTime: string
    versionNo: Number
}

class Post {
    id: Number
    title: String
    coverImg: FileResource
    owner: User
    imgs: FileResource[]
    markdown: String
    torrents: Torrent[]
    labels: Label[]
    remark: string
    status: Number
    updateTime: string
    createTime: string
    versionNo: Number
}

class Torrent {
    infoHash: String
    title: String  //用户命名的
    name: String  //torrent中的名称
    length: Number
    comment: String    // torrent中的注释
    files: String
    creationDate: Number  //秒时间戳
    createdBy: String
    pieceLength: Number
    singleFile: Boolean
    //complete – 目前做种人数
    complete: Number
    //incomplete – 目前正在下载人数
    incomplete: Number
    //downloaded – 曾经下载完成过的人数
    downloaded: Number
    peer: Peer[]
    owner: User
    post: Post

    status: Number
    updateTime: string
    createTime: string
    versionNo: Number
}


export { Permission, Role, Record, Post, Torrent, FileResource, Peer }