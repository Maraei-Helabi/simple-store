export const useFetchApi =(request, options) => {
    const config = useRuntimeConfig();
    
    return useFetch(request, {
    baseURL: config.public.baseURL,
    ...options
    })
}