import axios from "axios";

const api = axios.create({
    baseURL: "https://backendd-vk3y.onrender.com/api/v1",
})

export default api;