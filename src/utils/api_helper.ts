import axios from 'axios';




const baseURL = process.env.REACT_APP_HOST;
console.log(baseURL,'6666666666666666');


const axiosAuthInstance = axios.create({
    // baseURL: `${baseURL}/v1/auth`
     baseURL: `${baseURL}/v1/api`
})

const axiosInstance = axios.create({
    baseURL: `${baseURL}/v1/api`
})

const setAuthToken = (config: any) => {

    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;

}




axiosAuthInstance.interceptors.request.use(setAuthToken, (error) =>
    Promise.reject(error)
)

axiosInstance.interceptors.request.use(setAuthToken, (error) =>
    Promise.reject(error)
)



export const GET_API=axiosInstance.get;
export const POST_API=axiosInstance.post;
export const PUT_API=axiosInstance.put;
export const DELETE_API=axiosInstance.delete;



export const  AUTH_POST_API =axiosAuthInstance.post;


