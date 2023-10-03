export const defaultRoute = {
    path: '/login',
    name: 'Login',
    component: () => import('../../pages/login.vue'),
    meta: {
        title: 'Login',
        isAuthed: false,
    },
}
