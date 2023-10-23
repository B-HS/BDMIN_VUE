import { axios } from '../../module/axios'

export const requestLoginInfo = async (email: string, pw: string) => axios.post('/login', { email, pw })
export const requestUserList = async (param?: object) => axios.post('/user/list', { ...param })
export const saveUserList = async (param: object[]) => axios.post('/user/save', param)
