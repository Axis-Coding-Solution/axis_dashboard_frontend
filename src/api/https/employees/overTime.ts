import { DELETE_API, GET_API, POST_API, PUT_API } from "../../../utils/api_helper.ts";
import { apiErrorHandler } from "../helpers.ts";
const url = "/overtime"

const appendUrl = (segment: string) => `${url}/${segment}`;
export const addOVERTIME = async (body: any) => {
    try {
        const res = await POST_API((url), body);
        return res.data
    } catch (error: any) {
        return apiErrorHandler(error)
    }
}

export const getAllOVERTIME = async () => {
    try {
      const res = await GET_API(url);
      return res?.data?.data?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const getByIdOVERTIME = async (id: string) => {
    try {
      const res = await GET_API(appendUrl(id));
      return res?.data?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };
  export const getByDataOVERTIME = async (date) => {
    try {
      console.log(date,'1111111111111111');
      const url = `/overtime?date=${date}`; 
      const res = await GET_API(url);
      return res?.data?.data;
    } catch (error) {
      return apiErrorHandler(error);
    }
  };
  export const delOVERTIME = async (id: string) => {
    try {
      const res = await DELETE_API(appendUrl(id));
      return res?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const editOVERTIME = async ({ id, data }: { id: string; data: any }) => {
    try {
      const res = await PUT_API(appendUrl(id), data);
      return res?.data;
    } catch (error: any) {
      return Promise.reject(apiErrorHandler(error));
    }
  };