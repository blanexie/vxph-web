import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    { path: '/login', component: () => import('../views/Login.vue') },
    { path: '/', component: () => import('../views/Login.vue') }
]


const router = createRouter({
    history: createWebHistory(), //使用history模式，hash模式使用 createWebHashHistory() 方法
    routes
})

export default router


