export const defaultRoute = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../../pages/home.vue'),
        meta: {
            title: 'HOME',
            isAuthed: true,
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../../pages/login.vue'),
        meta: {
            title: 'Login',
            isAuthed: false,
        },
    },
    {
        path: '/refresh',
        name: 'Refresh',
        component: () => import('../../pages/refresh/refresh.vue'),
        meta: {
            title: 'Refreshing...',
            isAuthed: true,
        },
    },
    {
        path: '/404',
        name: 'Not found',
        component: () => import('../../pages/404.vue'),
        meta: {
            title: 'not found',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    },
]
