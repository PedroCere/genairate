import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('genairate_token');
    if (token) {
      // Set a dummy user if token exists to simulate logged-in state
      setUser({
        id: 'dummy-user',
        name: 'Dummy User',
        preferences: {
          language: 'es',
          tone: 'profesional'
        }
      });
    }
    setLoading(false);
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
