import { axios } from '../../module/axios'

export const requestLoginInfo = async (email: string, pw: string) => axios.post('/login', { email, pw })
