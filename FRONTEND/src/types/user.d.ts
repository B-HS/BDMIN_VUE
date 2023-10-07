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

export interface User {
    atk?: string
    rtk?: string
    rawUserInfo?: ServerUserInfo
}
