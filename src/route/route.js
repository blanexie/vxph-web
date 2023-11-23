import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '/login',
        component: () => import('../views/login.vue')
    },
    {
        path: '/',
        component: () => import('../views/home.vue')
    },
    {
        path: '/role',
        component: () => import('../views/role.vue')
    }, {
        path: '/permission',
        component: () => import('../views/permission.vue')
    },
    {
        path: '/signUp',
        component: () => import('../views/SignUp.vue')
    },
    {
        path: '/home',
        component: () => import('../views/home.vue')
    },
    {
        path: '/ddns',
        component: () => import('../views/ddns.vue')
    },
]


const router = createRouter({
    history: createWebHistory(),   
    routes
})

export default router