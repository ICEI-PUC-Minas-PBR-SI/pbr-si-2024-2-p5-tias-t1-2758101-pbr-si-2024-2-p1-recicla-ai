import axios from "axios";

const api = axios.create({
    baseURL: "" // Mudar para o ip do PC que está rodando a api
})

export default api;