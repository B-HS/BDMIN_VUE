import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { appSetting } from '../../types/app'
import { store } from '../store'

const useAppstore = defineStore(
    'appSetting',
    () => {
        const state = reactive<appSetting>({
            isLoading: false,
            menubarWidth: 250,
            menubarHide: false,
        })

        const getPageLoading = () => computed(() => state.isLoading).value
        const setPageLoading = (isLoading: boolean) => Object.assign(state, { isLoading })

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
