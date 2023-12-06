<template>
    <el-affix position="top" :offset="2">
        <el-menu active-text-color="#ffd04b" background-color="#74759b" mode="horizontal" class="el-menu-vertical-demo"
            default-active="1" text-color="#fff" @open="handleOpen" @close="handleClose">
            <el-menu-item @click="toRouter" index="/home">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>首页</span>
            </el-menu-item>

            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>用户管理</span>
                </template>
                <el-menu-item-group title="Group One">
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title>item four</template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item @click="toRouter" index="/ddns">
                <el-icon><icon-menu /></el-icon>
                <span>DDNS</span>
            </el-menu-item>
            <el-menu-item @click="toRouter" index="/post">
                <el-icon>
                    <document />
                </el-icon>
                <span>Post</span>
            </el-menu-item>
            <el-menu-item @click="toRouter" index="/role">
                <el-icon>
                    <setting />
                </el-icon>
                <span>角色管理</span>
            </el-menu-item>
            <el-menu-item @click="toRouter" index="/permission">
                <el-icon>
                    <setting />
                </el-icon>
                <span>权限管理</span>
            </el-menu-item>
        </el-menu>
    </el-affix>
</template>

<style scoped>
.el-menu-vertical-demo {
    height: 100%;
}
</style>
<script lang="ts" setup>
import { Document, Menu as IconMenu, Location, Setting, HomeFilled, } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router"
const router = useRouter()

const toRouter = (e: { index: string; }) => {
    router.push(e.index)
}

const handleOpen = (key: string, keyPath: string[]) => {
};
const handleClose = (key: string, keyPath: string[]) => {
};


</script>
