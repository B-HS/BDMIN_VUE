const useEnv = () => {
    const ENV = ['VITE_API_BASE_URL', 'VITE_PUBLIC_PATH', 'VITE_APP_TITLE'] as const
    const getEnv = <T extends (typeof ENV)[number]>(target: T) => import.meta.env[target]
    return { getEnv }
}
export const { getEnv } = useEnv()
