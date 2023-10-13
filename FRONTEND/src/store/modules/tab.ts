import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { router } from '../../router/router'
import { store } from '../store'

const useTabStore = defineStore('tab', () => {
    const state = reactive({
        cachedTab: [] as string[],
    })

    const addCache = (menuname: string) => (state.cachedTab = [...new Set([...state.cachedTab, menuname])])
    const getCacheList = () => computed(() => state.cachedTab).value
    const removeCache = (menuname: string) => {
        const leftTab = state.cachedTab[state.cachedTab.indexOf(menuname) - 1]
        const rightTab = state.cachedTab[state.cachedTab.indexOf(menuname) + 1]
        state.cachedTab = state.cachedTab.filter((item) => item !== menuname)
        router.push({ name: leftTab || rightTab || 'Home' })
    }

    return {
        state,
        addCache,
        getCacheList,
        removeCache,
    }
})
const useTabStoreWithoutInit = () => useTabStore(store)

export { useTabStore, useTabStoreWithoutInit }
