import axios from "axios";

const api = axios.create({
    baseURL: "http://172.20.10.7:8080/" // Mudar para o ip do PC que está rodando a api
})

export default api;