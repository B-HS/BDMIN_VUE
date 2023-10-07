import { Router } from 'vue-router'
import { useUserStore } from '../../store/modules/user'

interface TOKEN {
    iss: string
    exp: number
    iat: number
    urkey: number
    email: string
}

const isTokenExpired = (token: TOKEN) => {
    return Date.now() >= token.exp * 1000
}

const tokenChecking = (atk: TOKEN | null, rtk: TOKEN | null) => {
    if (atk && rtk && !isTokenExpired(atk) && !isTokenExpired(rtk)) {
        return true
    }
    return false
}

export const routerGuard = (router: Router) => {
    router.beforeEach((to, _from, next) => {
        if (!to.meta.isAuthed) {
            next()
            return
        }

        const rawAtk = useUserStore().getState('atk') as string | undefined
        const rawRtk = useUserStore().getState('rtk') as string | undefined

        if (!rawAtk || !rawRtk) {
            next('/login')
            return
        }

        const atkObj = JSON.parse(window.atob(rawAtk.split('.')[1]))
        const rtkObj = JSON.parse(window.atob(rawRtk.split('.')[1]))

        if (tokenChecking(atkObj, rtkObj)) {
            next()
        } else {
            next('/login')
        }
    })
}
