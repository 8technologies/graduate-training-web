import axios from "axios";

const axiosClient = axios.create({
    baseURL: "/api",
    // Because we're proxying to /api in Next.js, we can set baseURL to "/api"
    // If you prefer calling external endpoints directly (and have working CORS),
    // you could do e.g. "http://localhost:5000/api"
});

// Optional Interceptor: Attach token if stored
axiosClient.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosClient;
