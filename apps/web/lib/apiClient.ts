import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true
  
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
        localStorage.clear();
        if(window.location.pathname !== "/login"){
          window.location.href = "/login";
        }
      
    }

    return Promise.reject(error);
  },
);

apiClient.defaults.baseURL = apiClient.defaults.baseURL + "/api/v1";

export default apiClient;