import api from "./api";
import { Alert } from "react-native";

export const authenticateUser = async (data) => {

    try {

        let email = data.email;
        let password = data.password
        const response = await api.get(`user/login/${email}-${password}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Erro ao realizar o login.";
        console.error("Erro:", errorMessage);

        Alert.alert("Erro", errorMessage);

        throw error;
    }
};

export const authenticateCompany = async (data) => {
    try {
        let email = data.email;
        let password = data.password;
        const response = await api.get(`company/login/${email}-${password}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Erro ao realizar o login.";
        console.error("Erro:", errorMessage);

        Alert.alert("Erro", errorMessage);

        throw error;
    }
};

export const deleteAccount = async (route, params = {}) => {
    try {
        const response = await api.delete(route, { params });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Erro ao realizar o login.";
        console.error("Erro:", errorMessage);

        Alert.alert("Erro", errorMessage);

        throw error;
    }
};

