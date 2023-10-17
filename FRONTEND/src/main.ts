import { createApp } from 'vue'
import App from './App.vue'
import { initI18n } from './locale/locale'
import { initGlobalComponents } from './module/globalComponents'
import { initRouter } from './router/router'
import { initStore } from './store/store'
import './style/global.sass'
const initProject = async () => {
    const app = createApp(App)
    initGlobalComponents(app)
    initStore(app)
    await initI18n(app)
    initRouter(app)

    app.mount('#app')
}

initProject()
