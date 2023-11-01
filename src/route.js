import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    { path: '/login', component: () => import('./components/Login.vue') },
    { path: '/', component: () => import('./components/Login.vue') }
]



const router = createRouter({
    history: createWebHistory(), //使用history模式，hash模式使用 createWebHashHistory() 方法
    routes
})

export default router


