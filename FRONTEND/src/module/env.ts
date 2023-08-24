const useEnv = () => {
    const ENV = [
        "API_BASE_URL",
        "PUBLIC_PATH"
    ] as const
    const getEnv = <T extends typeof ENV[number]>(target: T) => import.meta.env[target];
    return { getEnv }
}
export const { getEnv } = useEnv()