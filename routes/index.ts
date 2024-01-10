import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../src/views/home/page.vue')
    },
    {
        path: '/:id',
        name: 'Contact',
        component: () => import('../src/views/contact/page.vue'),
        props: true
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active"
})