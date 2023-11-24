
class Permission {
    code: string
    name: string
    description: string
    type: string
}


class Role {
    id: number
    code: string
    name: string
    description: string
    status: number
    createTime: string
    updateTime: string
    permissions: Permission[]
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
    updateTime: string
    createTime: string
    remark: string
    versionNo: Number
}

export { Permission, Role, Record }