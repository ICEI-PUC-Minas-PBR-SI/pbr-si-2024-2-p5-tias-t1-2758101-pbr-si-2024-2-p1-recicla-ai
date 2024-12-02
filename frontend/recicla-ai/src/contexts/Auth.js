import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticateUser, authenticateCompany } from "../services/authServices";
import { makeGetRequest } from "../services/apiRequests";

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
    updateUserData();
  }, []);

  const updateUserData = async () => {
    if (authData && authData.id) {
      try {
        const response = await makeGetRequest(`user/${authData.id}`);
        setAuthData({ ...authData, points: response.points });
        await AsyncStorage.setItem("user", JSON.stringify({ ...authData, points: response.points }));
      } catch (err) {
        console.error("Erro ao carregar os dados atualizados do usuário.");
      }
    }
  };

  async function signInUser(data) {
    const userData = await authenticateUser(data);

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
    <AuthContext.Provider value={{ authData, authType, isAuthenticated: !!authData, signInUser, signInCompany, signOut, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
