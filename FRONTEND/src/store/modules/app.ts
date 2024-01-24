import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { store } from '../store'

const useAppstore = defineStore(
    'appSetting',
    () => {
        const nonePersistState = reactive({
            isLoading: false,
        })
        const state = reactive({
            menubarWidth: 250,
            menubarHide: false,
        })

        const getPageLoading = () => nonePersistState.isLoading
        const setPageLoading = (isLoading: boolean) => (nonePersistState.isLoading = isLoading)

        const getMenubarWidth = () => computed(() => state.menubarWidth).value
        const setMenubarWidth = (width: number) => (state.menubarWidth = width)

        const getMenuHide = () => computed(() => state.menubarHide).value
        const setMenuHide = (isHide: boolean) => (state.menubarHide = isHide)

        return {
            state,
            getPageLoading,
            setPageLoading,
            getMenubarWidth,
            setMenubarWidth,
            getMenuHide,
            setMenuHide,
        }
    },
    {
        persist: true,
    },
)
const useAppstoreWithoutInit = () => useAppstore(store)

export { useAppstore, useAppstoreWithoutInit }
