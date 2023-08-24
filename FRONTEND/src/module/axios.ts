import axios from "axios";
import { getEnv } from "./env";
import { useAppstore } from "../store/modules/app";
const instance = axios.create({
    baseURL: getEnv('API_BASE_URL')

})

instance.interceptors.request.use((config) => {
    useAppstore().setPageLoading(true)
    return config;
}, (error) => {
    useAppstore().setPageLoading(false)
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    useAppstore().setPageLoading(false)
    return response;
}, (error) => {
    useAppstore().setPageLoading(false)
    return Promise.reject(error);
})


export { instance as axios }