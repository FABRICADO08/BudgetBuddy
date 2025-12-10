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

    // On app load, try to refresh token to see if user is still logged in via Cookie
    useEffect(() => {
        const verifySession = async () => {
            try {
                const response = await api.post('/auth/refresh-token');
                const token = response.data.accessToken;
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };
        verifySession();
    }, []);

    const login = (token: string) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsAuthenticated(true);
    };

    const logout = () => {
        delete api.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
        // Ideally call a backend logout endpoint here to clear the cookie too
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};