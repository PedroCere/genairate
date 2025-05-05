import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    localStorage.setItem('genairate_token', 'demo-token');
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('genairate_token');
      
      try {
       
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (token) {
          const userData = {
            id: 'demo-user',
            name: 'Demo User',
            email: 'demo@genairate.com',
            preferences: {
              language: 'es',
              tone: 'profesional',
              autoCorrect: true
            },
            stats: {
              totalArticles: 3,
              totalWords: 1500,
              lastEdited: new Date().toISOString()
            }
          };
          setUser(userData);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (userData, token) => {
    localStorage.setItem('genairate_token', token);
    setUser({
      ...userData,
      preferences: userData.preferences || {
        language: 'es',
        tone: 'profesional'
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('genairate_token');
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('genairate_token');
  };

  const updateUserPreferences = (newPreferences) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...newPreferences
      }
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated,
        updateUserPreferences
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};