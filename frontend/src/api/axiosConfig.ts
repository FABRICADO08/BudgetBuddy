import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    withCredentials: true, // This allows the HttpOnly Cookie to be sent
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response Interceptor: Handles 403 Forbidden (Expired Token)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 403 (Forbidden) and we haven't retried yet
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                // 1. Call backend to get new Access Token (using the hidden Cookie)
                const response = await axios.post(
                    'http://localhost:8080/api/v1/auth/refresh-token',
                    {},
                    { withCredentials: true }
                );

                // 2. Put new token in the header
                const newAccessToken = response.data.accessToken;
                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // 3. Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                // 4. If refresh fails, the user is truly logged out.
                console.error("Session expired", refreshError);
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;