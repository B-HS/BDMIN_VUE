import { axios } from '../../module/axios'

export const requestMenuList = async (param?: object) => axios.post('/menus', { ...param })
