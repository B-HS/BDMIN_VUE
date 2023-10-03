import { createApp } from 'vue'
import App from './App.vue'
import './style/global.sass'
import { initStore } from './store/store'
import { initRouter } from './router/router'
const initProject = async () => {
    const app = createApp(App)
    initStore(app)
    initRouter(app)
    app.mount('#app')
}

initProject()
