import { createRouter, createWebHistory } from 'vue-router';
import GlobalHowlsView from '/src/views/GlobalHowlsView.vue';
import NotFoundView from '/src/views/NotFoundView.vue';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'global_chat',
            component: GlobalHowlsView,
        },
        // {
        //     path: '/tags/:tag',
        //     name: 'tags',
        //     component: ProjectsView,
        // },
        {
            path: '/:catchAll(.*)',
            name: 'page-not-found',
            component: NotFoundView,
        },
    ]
});

export default router;