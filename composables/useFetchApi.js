export const useFetchApi = (request, options = {}) => {
  const config = useRuntimeConfig();

  const response = useFetch(request, {
    baseURL: config.public.baseURL,
    ...options
  });

   console.log("🔥 استجابة الـ API:", response);

  return response
};