class User {
    id: Number | undefined
    name: string | undefined
    email: string | undefined
}

class Permission {
    code: string | undefined
    name: string | undefined
    description: string | undefined
    type: string | undefined
    status: number | undefined
    createTime: string | undefined
    updateTime: string | undefined
    versionNo: Number | undefined
}

class Role {
    id: number | undefined
    code: string | undefined
    name: string | undefined
    description: string | undefined
    permissions: Permission[] | undefined
    status: number | undefined
    createTime: string | undefined
    updateTime: string | undefined
    versionNo: Number | undefined
}

class Record {
    id: number | undefined
    recordId: string | undefined
    domainName: string | undefined
    rr: string | undefined
    type: string | undefined
    value: string | undefined
    ttl: string | undefined
    remark: string | undefined
    versionNo: Number | undefined
    status: Number | undefined
    updateTime: string | undefined
    createTime: string | undefined

}

class FileResource {
    hash: string | undefined
    name: string | undefined
    suffix: string | undefined //文件的后缀，同时也是表示文件的类型，
    length: Number | undefined
    file: File | undefined
    base64: string | undefined
    url: string | undefined
    owner: Number | undefined
    status: Number | undefined
    updateTime: string | undefined
    createTime: string | undefined
    versionNo: Number | undefined
}

class Peer {
    id: Number | undefined
    infoHash: string | undefined
    passKey: string | undefined
    peerId: string | undefined
    ipv4: string | undefined
    ipv6: string | undefined
    port: Number | undefined
    downloaded: Number | undefined
    left: Number | undefined
    uploaded: Number | undefined
    event: string | undefined
    uploadTime: Date | undefined
    torrent: Torrent | undefined
    user: Number | undefined
    status: Number | undefined
    updateTime: string | undefined
    createTime: string | undefined
    versionNo: Number | undefined
}

class Label {
    id: Number | undefined
    code: string | undefined
    name: string | undefined
    type: string | undefined
    status: Number | undefined
    updateTime: string | undefined
    createTime: string | undefined
    versionNo: Number | undefined
}

class Post {
    id: Number | undefined
    title: string | undefined
    coverImg: FileResource | undefined
    imgs: FileResource[] | undefined
    owner: Number | undefined
    markdown: string | undefined
    torrents: Torrent[] | undefined
    type: string | undefined
    labels: Label[] | undefined
    remark: string | undefined
    status: Number | undefined
    updateTime: string | undefined
    createTime: string | undefined
    versionNo: Number | undefined
}

class Torrent {
    infoHash: string | undefined
    title: string | undefined //用户命名的
    name: string | undefined //torrent中的名称
    length: Number | undefined
    comment: string | undefined   // torrent中的注释
    files: string | undefined
    creationDate: Number | undefined //秒时间戳
    createdBy: string | undefined
    pieceLength: Number | undefined
    singleFile: Boolean | undefined
    //complete – 目前做种人数
    complete: number | undefined
    //incomplete – 目前正在下载人数
    incomplete: number | undefined
    //downloaded – 曾经下载完成过的人数
    downloaded: number | undefined
    peer: Peer[] | undefined
    owner: Number | undefined
    post: Post | undefined

    status: Number | undefined
    updateTime: string | undefined
    createTime: string | undefined
    versionNo: Number | undefined
}

class TokenInfo {
    tokenName: string | undefined
    tokenValue: string | undefined
    isLogin: boolean | undefined
    loginId: string | undefined
    loginType: string | undefined
    tokenTimeout: string | undefined
    sessionTimeout: string | undefined
    tokenSessionTimeout: string | undefined
    tokenActiveTimeout: string | undefined
    loginDevice: string | undefined
    tag: any | undefined
}

export { Permission, Role, Record, Post, Torrent, FileResource, Peer, Label, TokenInfo }