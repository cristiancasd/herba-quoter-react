import axios from 'axios'; 
import { getEnvVariables } from '../helpers/getEnvVariables';

const {VITE_API_URL_NEST}=getEnvVariables();

const quoterApi = axios.create({ 
    baseURL:  VITE_API_URL_NEST
});

//TODO configurar interceptorres
quoterApi.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return config;
})

export default quoterApi;
