import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  // so when we refresh it doesnt go fully
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    // in page referesh store it
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = (data) => {
    if (data) {
      setIsLoggedIn(false);
      setUser(null);
      sessionStorage.removeItem("user");
    }
  };

  return (
    <SessionContext.Provider
      value={{ isLoggedIn, loading, user, login, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};
