import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticateUser, authenticateCompany } from "../services/authServices";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [authType, setAuthType] = useState(null);

  const loadAuthData = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    const storedAuthType = await AsyncStorage.getItem("authType");
    
    if (storedUser && storedAuthType) {
      setAuthData(JSON.parse(storedUser));
      setAuthType(storedAuthType);
    }
  };

  useEffect(() => {
    loadAuthData();
  }, []);

  async function signInUser(data) {
    const userData = await authenticateUser(data);
    console.log(userData);
    setAuthData(userData);
    setAuthType("user");
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    await AsyncStorage.setItem("authType", "user");
  }

  async function signInCompany(data) {
    const companyData = await authenticateCompany(data);
    setAuthData(companyData);
    setAuthType("company");
    await AsyncStorage.setItem("user", JSON.stringify(companyData));
    await AsyncStorage.setItem("authType", "company");
  }

  async function signOut() {
    setAuthData(null);
    setAuthType(null);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("authType");
  }

  return (
    <AuthContext.Provider value={{ authData, authType, isAuthenticated: !!authData, signInUser, signInCompany, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
