import API_BASE_URL from '@/Config/ApiConfig';
import axios from 'axios';
import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    logout: () => void;
  }

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
      console.log(isAuthenticated)
    }, []);
  
    const logout = async () => {
        try {
          // Optional: Send request to the server to log out (clear session or JWT)
          const response = await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
      
          if (response.status === 200) {
            // Clear local storage and authentication state
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Logout error:', error);
        }
      };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };