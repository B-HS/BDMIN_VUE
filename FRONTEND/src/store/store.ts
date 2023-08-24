import { createPinia } from "pinia";
import type { App } from "vue";
import { createPersistedState } from 'pinia-plugin-persistedstate'

const store = createPinia().use(createPersistedState({storage: localStorage}))

const initStore = (app: App<Element>) => {
    app.use(store)
}

export { store, initStore }