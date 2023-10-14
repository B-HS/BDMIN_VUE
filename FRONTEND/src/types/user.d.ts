interface Token {
    atk: string
    rtk: string
}
interface ServerUserInfo {
    email: string
    introduce: string
    lastLogin: string | Date
    nickname: string
    roles: string[]
    urkey: number
    urname: string
}

export interface MenuItem {
    name: string
    mekey: number
    mename: string
    parentmekey: number | null
    component?: Function
    children?: MenuItem[]
    path: string
    file: string
    meorder: number | null
    hide: boolean | null
    cache: boolean | null
    meta: Record<string, unknown>
    raw?: Record<string, string>
}

export interface User {
    atk?: string
    rtk?: string
    rawUserInfo?: ServerUserInfo
    rawMenu?: MenuItem
    refectoredMenu?: MenuItem[]
}
