import { axios } from '../../module/axios'

export const requestMenuList = async (param?: object) => axios.post('/menus/list', { ...param })
export const saveMenuList = async (param: object[]) => axios.post('/menus/save', param)
