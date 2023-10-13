import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { router } from '../../router/router'
import { store } from '../store'

const useTabStore = defineStore('tab', () => {
    const state = reactive({
        cachedTab: [] as string[],
    })

    const addCache = (menuname: string) => (state.cachedTab = [...new Set([...state.cachedTab, menuname])])
    const getCacheList = () => computed(() => state.cachedTab).value.filter((val) => val !== 'Home')
    const removeCache = (menuname: string) => {
        const leftTab = state.cachedTab[state.cachedTab.indexOf(menuname) - 1]
        const rightTab = state.cachedTab[state.cachedTab.indexOf(menuname) + 1]
        state.cachedTab = state.cachedTab.filter((item) => item !== menuname)
        if (router.currentRoute.value.name === menuname) {
            router.push({ name: leftTab || rightTab || 'Home' })
        }
    }
    const refreshCurrentTab = () => {
        const menuname = router.currentRoute.value.name as string
        const orgTabLocation = state.cachedTab.indexOf(menuname)
        const currentRouteName = router.currentRoute.value.name as string
        state.cachedTab.splice(orgTabLocation, 1)
        router.push({ name: 'Refresh' }).then(() => {
            state.cachedTab.splice(orgTabLocation, 0, menuname)
            state.cachedTab = state.cachedTab.filter((val) => val !== 'Refresh')
            router.push({ name: currentRouteName })
        })
    }

    return {
        state,
        addCache,
        getCacheList,
        removeCache,
        refreshCurrentTab,
    }
})
const useTabStoreWithoutInit = () => useTabStore(store)

export { useTabStore, useTabStoreWithoutInit }
