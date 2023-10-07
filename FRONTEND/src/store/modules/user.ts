import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { axios } from '../../module/axios'
import { router } from '../../router/router'
import { menuBuilder } from '../../router/tools/menuBuilder'
import { User } from '../../types/user'
import { store } from '../store'

const useUserStore = defineStore(
    'user',
    () => {
        type State = keyof typeof state
        const state = reactive<User>({
            atk: undefined,
            rtk: undefined,
            rawUserInfo: undefined,
            rawMenu: undefined,
        })

        const getState = (target: State) => {
            const value = computed(() => state[target]).value
            if (value) return value
            else {
                const rawObj = window.localStorage.getItem('user')
                return rawObj ? JSON.parse(rawObj)[target] : undefined
            }
        }
        const setUser = (user: User) => {
            state.atk = user.atk
            state.rtk = user.rtk
            state.rawUserInfo = user.rawUserInfo
            state.rawMenu = user.rawMenu
        }
        const resetState = () => {
            state.atk = undefined
            state.rtk = undefined
            state.rawUserInfo = undefined
            state.rawMenu = undefined
        }
        const login = async (email: string, pw: string) => {
            const { data } = await axios.post('/login', { email, pw })
            if (data) {
                const { atk, rtk, userInfo, menu } = data
                setUser({ atk, rtk, rawUserInfo: userInfo, rawMenu: menu })
                router.push('/')
            }

            menuBuilder()
        }

        return {
            state,
            getState,
            setUser,
            resetState,
            login,
        }
    },
    {
        persist: {
            storage: localStorage,
            serializer: {
                // TODO 함수 포함 + key값에 따른 구문 암호화 가능한 serializer/deserializer 구현 필요
                serialize: (state) => JSON.stringify(state),
                deserialize: (state) => JSON.parse(state),
            },
        },
    },
)

const useUserStoreWithoutInit = () => useUserStore(store)

export { useUserStore, useUserStoreWithoutInit }
