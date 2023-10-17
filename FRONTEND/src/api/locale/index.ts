import { axios } from '../../module/axios'

export const requestFullLocaleList = async () => axios.post('/locale')
export const saveLocale = async (locale: object[]) => axios.post('/locale/save', [...locale])
export const deleteLocale = async (locale: (string | undefined)[]) => axios.post('/locale/delete', [...locale])
