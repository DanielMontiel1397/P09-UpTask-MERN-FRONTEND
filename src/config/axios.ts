import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
});

//Interceptar consulta
clienteAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('AUTH_TOKEN_UPTASK');

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default clienteAxios;