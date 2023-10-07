import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { store } from '../store'

const useTabStore = defineStore('tab', () => {
    const state = reactive({
        cachedTab: [] as string[],
    })

    const addCache = (menuname: string) => (state.cachedTab = [...new Set([...state.cachedTab, menuname])])

    const getCacheList = () => computed(() => state.cachedTab).value

    return {
        state,
        addCache,
        getCacheList,
    }
})
const useTabStoreWithoutInit = () => useTabStore(store)

export { useTabStore, useTabStoreWithoutInit }
