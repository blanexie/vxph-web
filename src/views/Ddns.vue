<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h2>阿里云动态解析记录</h2>
                <br />
                <div>当前服务端 <br />
                    ipv4: 192.168.1.1 <br />
                    ipv6 FC00:0000:130F:0000:0000:09C0:876A:130B </div>
            </div>
        </template>
        <el-table :data="tableData" stripe="true" style="width: 100%" height="250">
            <el-table-column fixed prop="recordId" label="recordId" width="150" />
            <el-table-column prop="type" label="type" width="80" />
            <el-table-column prop="rr" label="rr" width="120" />
            <el-table-column prop="value" label="value" width="180" />
            <el-table-column prop="domainName" label="domainName" width="180" />
            <el-table-column prop="ttl" label="ttl" width="80" />
            <el-table-column prop="remark" label="remark" width="120" />
            <el-table-column prop="updateTime" label="updateTime" width="120" />
            <el-table-column prop="createTime" label="createTime" width="120" />
        </el-table>
    </el-card>
</template>
  
<script lang="ts" setup>
const tableData = [
    {
        recordId: '2016-05-03',
        type: 'Tom',
        rr: 'California',
        value: 'Los Angeles',
        domainName: 'No. 189, Grove St, Los Angeles',
        ttl: 'CA 90036',
        remark: 'CA 90036',
        updateTime: 'CA 90036',
        createTime: 'CA 90036',
    },
    {
        recordId: '2016-05-03',
        type: 'Tom',
        rr: 'California',
        value: 'Los Angeles',
        domainName: 'No. 189, Grove St, Los Angeles',
        ttl: 'CA 90036',
        remark: 'CA 90036',
        updateTime: 'CA 90036',
        createTime: 'CA 90036',
    },
    {
        recordId: '2016-05-03',
        type: 'Tom',
        rr: 'California',
        value: 'Los Angeles',
        domainName: 'No. 189, Grove St, Los Angeles',
        ttl: 'CA 90036',
        remark: 'CA 90036',
        updateTime: 'CA 90036',
        createTime: 'CA 90036',
    }
]
</script>
  