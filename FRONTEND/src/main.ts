import { createApp } from 'vue'
import App from './App.vue'
import './style/global.sass'
import { initStore } from './store/store'
import { initRouter } from './router/router'
import { initGlobalComponents } from './module/globalComponents'
const initProject = async () => {
    const app = createApp(App)
    initGlobalComponents(app)
    initStore(app)
    initRouter(app)
    app.mount('#app')
}

initProject()
