<template>
    <div class="card-div">
        <p>ipv4: {{ showIps.ipv4 }}</p>
        <p>ipv6: {{ showIps.ipv6 }}</p>
        <p>
            <el-button type="primary" @click.prevent="drawerShow(undefined)">
                新增记录
            </el-button>
        </p>
    </div>
    <div class="card-div">
        <el-table :data="tableData?.content" border style="width: 100%">
            <!-- <el-table-column fixed prop="id" label="id" /> -->
            <!-- <el-table-column prop="recordId" label="recordId"  width="165"/> -->
            <el-table-column prop="domainName" label="domainName" />
            <el-table-column prop="rr" label="rr" />
            <el-table-column prop="type" label="type" />
            <el-table-column prop="value" label="value" />
            <el-table-column prop="ttl" label="ttl" />
            <!-- <el-table-column prop="remark" label="remark"  /> -->
            <!-- <el-table-column prop="status" label="status" width="70"/> -->
            <el-table-column prop="updateTime" label="updateTime" width="155" />
            <el-table-column prop="createTime" label="createTime" width="155" />
            <el-table-column fixed="right" label="Operations">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click.prevent="drawerShow(scope.$index)">
                        操作
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <div>
        <el-drawer v-model="showRecord.show" title="Record" size="600" direction="rtl">
            <el-form label-position="top" label-width="100px" :model="showRecord.reocrd">
                <el-form-item label="RecordId">
                    <el-input disabled v-model="showRecord.reocrd.recordId" />
                </el-form-item>
                <el-form-item label="DomainName">
                    <el-input :disabled="showRecord.onlyShow" v-model="showRecord.reocrd.domainName" />
                </el-form-item>
                <el-form-item label="RR">
                    <el-input :disabled="showRecord.onlyShow" v-model="showRecord.reocrd.rr" />
                </el-form-item>
                <el-form-item label="Type">
                    <el-input :disabled="showRecord.onlyShow" v-model="showRecord.reocrd.type" />
                </el-form-item>
                <el-form-item label="TTL">
                    <el-input :disabled="showRecord.onlyShow" v-model="showRecord.reocrd.ttl" />
                </el-form-item>
                <el-form-item label="Remark">
                    <el-input type="textarea" :disabled="showRecord.onlyShow" v-model="showRecord.reocrd.remark" />
                </el-form-item>
                <el-form-item label="Status">
                    <el-input disabled v-model="showRecord.reocrd.status" />
                </el-form-item>
                <el-form-item label="UpdateTime">
                    <el-input disabled v-model="showRecord.reocrd.updateTime" />
                </el-form-item>
                <el-form-item label="CreateTime">
                    <el-input disabled v-model="showRecord.reocrd.createTime" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addOrUpdate">更新</el-button>
                    <el-button type="primary" @click="syncRecord">同步到Aliyun</el-button>
                    <el-button type="primary" @click="downRecord">从Aliyun同步</el-button>
                    <el-button type="primary" @click="removeRow">删除(含Aliyun)</el-button>
                </el-form-item>
            </el-form>

        </el-drawer>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { ddnsReq } from "@/common/request"
import { Record } from '@/common/class';
import { ElNotification } from 'element-plus';

const showIps = reactive<{
    ipv4: string,
    ipv6: string
}>({
    ipv4: '',
    ipv6: ''
})

const showRecord = reactive<{
    show: boolean,
    onlyShow: boolean,
    reocrd: Record
}>({
    show: false,
    onlyShow: false,
    reocrd: new Record()
})


const tableData = reactive<{
    content: Record[],
    pageNo: number,
    pageSize: number,
    pageCount: number
}>({
    content: [],
    pageNo: 1,
    pageSize: 10,
    pageCount: 10
})


const drawerShow = (index: number | undefined) => {
    if (index != undefined) {
        showRecord.reocrd = tableData.content[index]
    } else {
        showRecord.reocrd = new Record()
    }
    showRecord.show = true
}

const addOrUpdate = () => {
    let record = showRecord.reocrd
    ddnsReq.addOrUpdate(record).then(resp => {
        if (resp) {
            ElNotification.info({ title: "更新成功", message: "更新成功" })
            showRecord.show = false;
        }
    })
}

const syncRecord = () => {
    let id = showRecord.reocrd.id
    ddnsReq.syncRecord(id).then(resp => {
        if (resp) {
            ElNotification.info({ title: "更新成功", message: "更新成功" })
        }
    })
}
const downRecord = () => {
    let recordId = showRecord.reocrd.recordId
    ddnsReq.downRecord(recordId).then(resp => {
        if (resp) {
            ElNotification.info({ title: "更新成功", message: "更新成功" })
        }
    })
}

const removeRow = () => {
    let recordId = showRecord.reocrd.recordId
    let r1 = ddnsReq.deleteAliyunRecord(recordId)
    let r2 = ddnsReq.deleteRecord(recordId)
    Promise.all([r1, r2]).then(resp => {
        ElNotification.info({ title: "更新成功", message: "更新成功" })
    })
}


onMounted(() => {
    ddnsReq.findRecords()
        .then(resp => {
            tableData.content = resp.data
        });
    ddnsReq.findLocalIp().then(resp => {
        let data = resp.data
        showIps.ipv4 = data.ipv4
        showIps.ipv6 = data.ipv6
    })
})


</script>