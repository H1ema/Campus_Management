import { createContext, useContext, useState, useEffect } from 'react';
import { fetchWithAuth } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          // Fetch user details if token exists
          // Adjust endpoint based on FastAPI implementation
          const userData = await fetchWithAuth('/users/me');
          setUser(userData);
        } catch (error) {
          console.error("Failed to restore session:", error);
          localStorage.removeItem('access_token');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (role, username, password) => {
    try {
      // FastAPI OAuth2PasswordBearer expects form data for token endpoint
      // Adjust if backend expects JSON: JSON.stringify({ username, password, role })
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      // Let's pass role too if backend needs it (FastAPI OAuth2 typically doesn't, but custom impl might)
      formData.append('grant_type', 'password');

      const data = await fetchWithAuth('/auth/login', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      localStorage.setItem('access_token', data.access_token);
      
      // Fallback user object if /auth/login doesn't return user info
      setUser(data.user || { role, name: username, id: data.id || 'sys-user' });
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
