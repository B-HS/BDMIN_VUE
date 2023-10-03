import { Router } from 'vue-router'

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

        const rawAtk = localStorage.getItem('atk')
        const rawRtk = localStorage.getItem('rtk')

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
