import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { getEnv } from "../module/env";

const router = createRouter({
    history: createWebHistory(getEnv('PUBLIC_PATH')),
    routes: [], // TODO 동적 이전에 기본으로 나타낼 라우트 설정
    scrollBehavior: () => ({ left: 0, top: 0, behavior: "smooth" }),
});

const initRouter = (app: App<Element>) => {
    app.use(router)
}

export { initRouter, router };
