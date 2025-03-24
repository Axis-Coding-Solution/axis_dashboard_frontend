import { useState, ReactNode } from "react";
import { AuthContext } from "../context";
import React from 'react';
import { getAuthFromStorage, removeUserFromLocalStorage, saveUserToLocalStorage, saveUserToSessionStorage } from "../../utils/index.ts";
import { useQueryClient } from "@tanstack/react-query";

type PropsTypes = {
  children: ReactNode;
};

const auth = getAuthFromStorage() ?? {
  isAuthenticated: false,
  user: null,
  token: null,
};

function AuthProvider({ children }: PropsTypes) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    auth.isAuthenticated ?? false
  );
  const [user, setUser] = useState<any>(auth.user ?? null);

  const queryClient = useQueryClient();

  const handleLogin = ({ user, token }: { user: any; token: string }) => {
    setIsAuthenticated(true);
    setUser(user);
    saveUserToLocalStorage({ user, token });
  };

  const handleLoginToSession = ({
    user,
    token,
  }: {
    user: any;
    token: string;
  }) => {
    setIsAuthenticated(true);
    setUser(user);
    saveUserToSessionStorage({ user, token });
  };

  const updateUser = (user: any) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    queryClient.clear();
    removeUserFromLocalStorage();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        handleLogin,
        handleLoginToSession,
        updateUser,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
