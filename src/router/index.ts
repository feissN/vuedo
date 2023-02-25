import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/create',
            name: 'create',
            component: () => import('../views/CreateNoteView.vue'),
        },
        {
            path: '/todos',
            name: 'todos',
            component: () => import('../views/TodosView.vue'),
        },
        {
            path: '/todo/:id',
            name: 'todo',
            component: () => import('../views/SingleTodoView.vue'),
        },
        {
            path: "/:catchAll(.*)",
            redirect: "/home"
        }
    ]
})


export default router
