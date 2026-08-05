import { 
  createContext, 
  useContext, 
  useEffect, 
  useState 
} from "react";

import {
  login as loginService,
  logout as logoutService,
  getCurrentUser
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  async function login(credentials) {
    const user = await loginService(credentials);
    
    setUser(user);
    
    return user;
  }
  
  async function logout() {
    await logoutService();
    
    setUser(null);
  }
  
  async function checkAuth() {
    try {
      const user = await getCurrentUser();

      setUser(user);

    } catch (error) {
      setUser(null);
    
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}
     >
        {children}
     </AuthContext.Provider> 
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}