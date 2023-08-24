import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { User } from "../../types/user";
import { store } from '../store';


const useUserStore = defineStore("userStore", () => {
    type State = keyof typeof state
    const state = reactive<User>({
        id: null,
        pw: null,
        role: null,
        token: null
    }) as Record<string, User | null>

    const getState = (target: State) => computed(() => state[target]).value
    const setUser = (user: User) => Object.assign(state, user)
    const resetState = () => Object.keys(state).forEach(key => state[key] = null)

    return {
        getState,
        setUser,
        resetState
    }
}, {
    persist: {
        storage: localStorage,
        serializer: {
            // TODO 함수 포함 + key값에 따른 구문 암호화 가능한 serializer/deserializer 구현 필요 
            serialize: (state) => JSON.stringify(state),
            deserialize: (state) => JSON.parse(state)
        }
    }
})

const useUserStoreWithoutInit = () => useUserStore(store)

export default { useUserStore, useUserStoreWithoutInit } 