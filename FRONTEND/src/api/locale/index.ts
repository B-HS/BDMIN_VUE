import { axios } from '../../module/axios'

export const requestFullLocaleList = async () => axios.post('/locale')
