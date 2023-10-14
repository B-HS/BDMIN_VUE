import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { getEnv } from '../module/env'
import { defaultRoute } from './routes/default'
import { menuBuilder } from './tools/menuBuilder'
import { routerGuard } from './tools/routerGuard'

const router = createRouter({
    history: createWebHistory(getEnv('VITE_PUBLIC_PATH')),
    routes: [...defaultRoute],
    scrollBehavior: () => ({ left: 0, top: 0, behavior: 'smooth' }),
})

const initRouter = (app: App<Element>) => {
    menuBuilder(router)
    routerGuard(router)
    app.use(router)
}

export { initRouter, router }
