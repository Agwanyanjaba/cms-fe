import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Fetch the base URL from the environment variable
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
