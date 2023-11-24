<template>
    <div>
        <div class="card-div f-box-card">
            <p>服务器ipv4 : {{ ips.ipv4 }}</p>
            <p>服务器ipv6 : {{ ips.ipv6 }}</p>
        </div>

        <div class="card-div">
            <el-table :data="tableData" :stripe="true" @row-click="rowClieck" :highlight-current-row="true"
                style="width: 100%" table-layout="auto">
                <el-table-column fixed prop="recordId" label="recordId" />
                <el-table-column prop="type" label="type" />
                <el-table-column prop="rr" label="rr" />
                <el-table-column prop="value" label="value" />
                <el-table-column prop="domainName" label="domain" />
                <el-table-column prop="ttl" label="ttl" />
                <el-table-column prop="updateTime" label="updateTime" />
                <el-table-column prop="createTime" label="createTime" />
                <el-table-column prop="remark" label="remark" />
            </el-table>
        </div>

        <el-drawer v-model="drawerData.show" title="解析记录" direction="rtl">
            <el-form label-position="right" label-width="100px" :model="drawerData.rowData">
                <el-form-item label="">
                    <el-switch v-model="drawerData.editDisable" :inactive-value="true" :active-value="false" class="mb-2"
                        active-text="修改" />
                </el-form-item>
                <el-form-item label="recordId">
                    <el-input v-model="drawerData.rowData.recordId" disabled />
                </el-form-item>
                <el-form-item label="domain">
                    <el-input v-model="drawerData.rowData.domainName" :disabled="drawerData.editDisable" />
                </el-form-item>
                <el-form-item label="rr">
                    <el-input v-model="drawerData.rowData.rr" :disabled="drawerData.editDisable" />
                </el-form-item>
                <el-form-item label="type">
                    <el-input v-model="drawerData.rowData.type" :disabled="drawerData.editDisable" />
                </el-form-item>
                <el-form-item label="value">
                    <el-input v-model="drawerData.rowData.value" :disabled="drawerData.editDisable" />
                </el-form-item>
                <el-form-item label="ttl">
                    <el-input-number v-model="drawerData.rowData.ttl" :min="600"  :disabled="drawerData.editDisable" />
                </el-form-item>
                <el-form-item label="remark">
                    <el-input type="textarea" v-model="drawerData.rowData.remark" :disabled="drawerData.editDisable" />
                </el-form-item>

                <el-form-item label="updateTime">
                    <el-input v-model="drawerData.rowData.updateTime" disabled />
                </el-form-item>
                <el-form-item label="createTime">
                    <el-input v-model="drawerData.rowData.createTime" disabled />
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="drawerData.editDisable" type="primary"
                        @click="updateRecord(drawerData.rowData)">提交</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>

    </div>
</template>
<style scoped>
.card-div {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: px;
    background-color: #ffffff;
}

.f-box-card {
    margin-bottom: 10px;
}
</style>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { ddnsReq } from "../common/axios"
import {Record} from "../common/class"

const drawerData = ref<{
    rowData: Record,
    show: boolean,
    editDisable: boolean,
}>({
    rowData: new Record(),
    show: false,
    editDisable: true
})
const tableData = ref<[Record]>([new Record()])
const ips = reactive<{
    ipv4: string,
    ipv6: string
}>({
    ipv4: '',
    ipv6: ''
})

const rowClieck = (row: Record) => {
    drawerData.value.rowData = row
    drawerData.value.show = true
    drawerData.value.editDisable = true
}

const updateRecord = (rowData: Record) => {
    ddnsReq.updateRecord(rowData).then(resp => {
        let record = resp.data
        tableData.value.filter(it => it.id = resp.data.id).forEach(it => {
            it.recordId = record.recordId;
            it.type = record.type;
            it.rr = record.rr;
            it.domainName = record.domainName;
            it.value = record.value;
            it.ttl = record.ttl;
            it.remark = record.remark;
            it.createTime = record.createTime;
            it.updateTime = record.updateTime;
            it.versionNo = record.versionNo
        })
        drawerData.value.editDisable = true
    })

}


onMounted(() => {

    ddnsReq.findLocalIp().then(resp => {
        const body = resp?.data
        ips.ipv4 = body.ipv4
        ips.ipv6 = body.ipv6
    });

    ddnsReq.findDomainRecords().then(resp => {
        const body = resp?.data
        tableData.value = body
    })
});
</script>
  
../common/axios