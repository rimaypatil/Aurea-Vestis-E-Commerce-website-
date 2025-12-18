import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // Configure Axios defaults
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    useEffect(() => {
        if (token) {
            // Validate token or fetch user profile if needed
            // For now, assume valid if present and just decode or keep user data
            // In a real app, you'd verify with backend /me endpoint
            setUser(JSON.parse(localStorage.getItem('user')));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, [token]);

    const login = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        setIsAuthModalOpen(false); // Close modal on successful login
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        delete axios.defaults.headers.common['Authorization'];
    };

    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated,
            login,
            logout,
            loading,
            isAuthModalOpen,
            openAuthModal,
            closeAuthModal
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
