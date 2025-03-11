import { DELETE_API, GET_API, POST_API, PUT_API } from "../../../utils/api_helper.ts";
import { apiErrorHandler } from "../helpers.ts";


const url = "/employee"

const appendUrl = (segment: string) => `${url}/${segment}`;
export const addEMPLOYEE = async (body: any) => {
    try {
        const res = await POST_API((url), body);
        console.log(res,'7777777777777777777777777');
        
        return res.data
    } catch (error: any) {
        return apiErrorHandler(error)
    }
}

export const getAllEMPLOYEE = async () => {
    try {
      const res = await GET_API(url);
      console.log(res,'66666666666');
      
      return res?.data?.data?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const getByIdEMPLOYEE = async (id: string) => {
    try {
      const res = await GET_API(appendUrl(id));
      return res?.data?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const delEMPLOYEE = async (id: string) => {
    try {
      const res = await DELETE_API(appendUrl(id));
      return res?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const editEMPLOYEE = async ({ id, data }: { id: string; data: any }) => {
    try {
      const res = await PUT_API(appendUrl(id), {data});
      console.log(res,'666666666666666');
      
      return res.data;
    } catch (error: any) {
      return Promise.reject(apiErrorHandler(error));
    }
  };