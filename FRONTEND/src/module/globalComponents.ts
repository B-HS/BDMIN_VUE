import type { App } from 'vue'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

const initGlobalComponents = (app: App) => {
    app.component('EasyDataTable', Vue3EasyDataTable)
}

export { initGlobalComponents }
