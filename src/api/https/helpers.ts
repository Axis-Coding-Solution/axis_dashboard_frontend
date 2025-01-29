import {AxiosError} from 'axios';


export const apiErrorHandler =(error:AxiosError | Error | undefined)=>{
    if(error instanceof AxiosError) return error.response?.data;
    return {error:'Runtime Error'};
}