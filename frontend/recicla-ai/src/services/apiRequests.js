import api from "./api";
import { Alert } from "react-native";

export const makePostRequest = async (route, data) => {
    try {

        const response = await api.post(route, data);

        Alert.alert("Sucesso", "Ação realizada com sucesso!");

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Erro ao realizar a requisição.";
        console.error("Erro:", errorMessage);

        Alert.alert("Erro", errorMessage);

        throw error;
    }
};

export const makeGetRequest = async (route, params = {}) => {
    try {
      const response = await api.get(route, { params });
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          return [];
        }
  
        const errorMessage = error.response?.data?.message ||
                             error.response?.statusText ||
                             "Erro ao realizar a requisição.";
        console.error("Erro:", errorMessage);
  
        Alert.alert("Erro", errorMessage);
      } else {
        console.error("Erro de rede ou configuração:", error);
        Alert.alert("Erro", "Erro ao tentar se conectar com o servidor.");
      }
  
      throw error; 
    }
  };