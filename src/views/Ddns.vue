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
            <el-form label-position="right" label-width="100px" :model="rowData" style="max-width: 960px">
                <el-form-item label="">
                    <el-switch v-model="editDisable" class="mb-2" active-text="查看中" inactive-text="修改中" />
                </el-form-item>
                <el-form-item label="recordId">
                    <el-input v-model="drawerData.rowData?.recordId" disabled />
                </el-form-item>
                <el-form-item label="domain">
                    <el-input v-model="drawerData.rowData?.domainName" :disabled="editDisable" />
                </el-form-item>
                <el-form-item label="rr">
                    <el-input v-model="drawerData.rowData?.rr" :disabled="editDisable" />
                </el-form-item>
                <el-form-item label="type">
                    <el-input v-model="drawerData.rowData?.type" :disabled="editDisable" />
                </el-form-item>
                <el-form-item label="value">
                    <el-input v-model="drawerData.rowData?.value" :disabled="editDisable" />
                </el-form-item>
                <el-form-item label="ttl">
                    <el-input v-model="drawerData.rowData?.ttl" :disabled="editDisable" />
                </el-form-item>
                <el-form-item label="updateTime">
                    <el-input v-model="drawerData.rowData?.updateTime" :disabled="editDisable" />
                </el-form-item>

                <el-form-item label="createTime">
                    <el-input v-model="drawerData.rowData?.createTime" :disabled="editDisable" />
                </el-form-item>
                <el-form-item label="remark">
                    <el-input v-model="drawerData.rowData?.remark" :disabled="editDisable" />
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
import { ddnsReq } from "../axios/axios"

const drawerData = ref<{
    rowData: {
        recordId: string,
        domainName: string,
        rr: string,
        type: string,
        value: string,
        ttl: string,
        updateTime: string,
        createTime: string,
        remark: string,
    } | undefined,
    show: boolean,
    editDisable: boolean,
}>({
    rowData: undefined,
    show: false,
    editDisable: true
})

const rowData = ref<{
    recordId: string,
    domainName: string,
    rr: string,
    type: string,
    value: string,
    ttl: string,
    updateTime: string,
    createTime: string,
    remark: string,
}>()

const drawer = ref(false)
const editDisable = ref(false)

const tableData = ref([])
const ips = reactive<{
    ipv4: string,
    ipv6: string
}>({
    ipv4: '',
    ipv6: ''
})

const rowClieck = (row) => {
    console.log(row)
    rowData.value = row
    drawer.value = true
    editDisable.value = true
}


onMounted(() => {

    ddnsReq.findLocalIp().then(resp => {
        const body = resp.data.data
        ips.ipv4 = body.ipv4
        ips.ipv6 = body.ipv6
    }),

        ddnsReq.findDomainRecords().then(resp => {
            const body = resp.data.data
            tableData.value = body
        })
});
</script>
  
