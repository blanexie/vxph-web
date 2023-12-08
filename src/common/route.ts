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
        path: '/post',
        component: () => import('../views/postList.vue')
    },
    {
        path: '/postEdit',
        component: () => import('../views/postEdit.vue')
    },
    {
        path: '/postProview',
        component: () => import('../views/postProview.vue')
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