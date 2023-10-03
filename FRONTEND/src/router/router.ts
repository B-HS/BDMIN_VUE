import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { getEnv } from '../module/env'
import { routerGuard } from './tools/routerGuard'
import { defaultRoute } from './routes/default'

const home = {
    path: '/',
    name: 'Home',
    component: () => import('../layout/layout.vue'),
    meta: {
        title: 'HOME',
        isAuthed: true,
    },
}

const router = createRouter({
    history: createWebHistory(getEnv('VITE_PUBLIC_PATH')),
    routes: [home, defaultRoute], // TODO 동적 이전에 기본으로 나타낼 라우트 설정
    scrollBehavior: () => ({ left: 0, top: 0, behavior: 'smooth' }),
})

const initRouter = (app: App<Element>) => {
    routerGuard(router)
    app.use(router)
}

export { initRouter, router }
