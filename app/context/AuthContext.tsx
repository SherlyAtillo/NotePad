import React, { createContext, useContext, useState, ReactNode } from 'react';  

interface User {  
  username: string;  
}  
  
interface AuthContextType {  
  user: User | null;  
  login: (username: string, password: string) => void;  
  logout: () => void;  
  isAuthenticated: boolean; 
}  

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {  
  children: ReactNode;   
}  

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {  
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add this line

  const login = (username: string, password: string) => {
    setIsAuthenticated(true);  
    if (username && password) {  
      setUser({ username });  
    }  
  };  

  const logout = () => {  
    setUser(null);
    setIsAuthenticated(false); 
  };  

  return (  
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>  
      {children}  
    </AuthContext.Provider>  
  );  
};  

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);  
  if (!context) {  
    throw new Error('useAuth must be used within an AuthProvider');  
  }  
  return context;  
};