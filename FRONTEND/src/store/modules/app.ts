import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { appSetting } from "../../types/app";
import { store } from '../store';


const useAppstore = defineStore("appStore", () => {
    const state = reactive<appSetting>({
        isLoading: false
    })

    const getPageLoading = () => computed(() => state.isLoading).value
    const setPageLoading = (isLoading: boolean) => Object.assign(state, { isLoading })

    return {
        getPageLoading,
        setPageLoading
    }
})
const useAppstoreWithoutInit = () => useAppstore(store)

export { useAppstore, useAppstoreWithoutInit } 