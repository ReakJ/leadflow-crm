import { 
  useEffect, 
  useState 
} from "react";

import {
  login as loginService,
  logout as logoutService,
  getCurrentUser
} from "../services/authService";

import { AuthContext } from "./AuthContext";

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
  
  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await getCurrentUser();

        setUser(user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

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