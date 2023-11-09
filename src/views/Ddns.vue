<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <h2>阿里云动态解析记录</h2>
                    <span>
                        ipv4: {{ result.ipv4 }} <br />
                        ipv6: {{ result.ipv6 }}
                    </span>
                </div>
            </template>
            <el-table :data="result.tableData" @row-click="rowClick" stripe="true" style="width: 100%" height="250">
                <el-table-column fixed prop="recordId" label="recordId" width="160" />
                <el-table-column prop="type" label="type" width="70" />
                <el-table-column prop="rr" label="rr" width="40" />
                <el-table-column prop="value" label="value" width="280" />
                <el-table-column prop="domainName" label="domainName" width="120" />
                <el-table-column prop="ttl" label="ttl" width="60" />
                <el-table-column prop="updateTime" label="updateTime" width="160" />
                <el-table-column prop="createTime" label="createTime" width="160" />
                <el-table-column prop="remark" label="remark" width="120" />
            </el-table>
        </el-card>


        <el-dialog v-model="result.dialogShow" style="width: auto;" title="解析记录">
            <el-table :data="result.clickRow">
                <el-table-column fixed prop="recordId" label="recordId" width="160" />
                <el-table-column prop="type" label="type" width="70" />
                <el-table-column prop="value" label="value" width="280" />
                <el-table-column prop="ttl" label="ttl" width="60" />
                <el-table-column prop="domainName" label="domainName" width="120" />
                <el-table-column prop="updateTime" label="updateTime" width="160" />
            </el-table>
        </el-dialog>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onMounted } from 'vue';
import { ddnsReq } from "../axios/axios"
const result = reactive<{
    ipv4: string,
    ipv6: string,
    tableData: [],
    clickRow: {},
    dialogShow: boolean
}>({
    ipv4: '',
    ipv6: '',
    tableData: [],
    clickRow: {}, dialogShow: false
})


const rowClick = function (row) {
    result.clickRow = [row]
    result.dialogShow = true
}

onMounted(() => {
    //请求获取数据
    ddnsReq.findLocalIp().then(resp => {
        const body = resp.data.body
        result.ipv4 = body.ipv4
        result.ipv6 = body.ipv6
    })

    ddnsReq.findDomainRecords().then(resp => {
        const body = resp.data.body
        body.dbDomainRecords.forEach(element => {
            result.tableData.push(element)
        });
    })
});
</script>
  
