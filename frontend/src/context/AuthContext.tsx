import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '../api/axiosConfig';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // On app load, check for OAuth2 callback token or refresh token
    useEffect(() => {
        const verifySession = async () => {
            try {
                // Check for OAuth2 token in URL (from backend redirect)
                const params = new URLSearchParams(window.location.search);
                const tokenFromUrl = params.get('accessToken');

                if (tokenFromUrl) {
                    // OAuth2 login succeeded, store token and redirect
                    api.defaults.headers.common['Authorization'] = `Bearer ${tokenFromUrl}`;
                    localStorage.setItem('accessToken', tokenFromUrl);
                    setIsAuthenticated(true);
                    // Clean URL and redirect
                    window.history.replaceState({}, document.title, '/');
                    return;
                }

                // Try to get stored token
                const storedToken = localStorage.getItem('accessToken');
                if (storedToken) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                    setIsAuthenticated(true);
                    setIsLoading(false);
                    return;
                }

                // Try to refresh token via cookie
                const response = await api.post('/auth/refresh-token');
                const token = response.data.accessToken;
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                localStorage.setItem('accessToken', token);
                setIsAuthenticated(true);
            } catch (error) {
                // No valid session
                localStorage.removeItem('accessToken');
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };
        verifySession();
    }, []);

    const login = (token: string) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('accessToken', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        delete api.defaults.headers.common['Authorization'];
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};