import { DELETE_API, GET_API, POST_API, PUT_API } from "../../../utils/api_helper.ts";
import { apiErrorHandler } from "../helpers.ts";
const url = "/leave-setting"

const appendUrl = (segment: string) => `${url}/${segment}`;
export const addLEAVESETTINGS = async (body: any) => {
    try {
        const res = await POST_API((url), body);
        return res.data
    } catch (error: any) {
        return apiErrorHandler(error)
    }
}

export const getAllLEAVESETTINGS = async () => {
    try {
      const res = await GET_API(url);
      return res?.data?.data?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const getByIdLEAVESETTINGS = async (id: string) => {
    try {
      const res = await GET_API(appendUrl(id));
      return res?.data?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };
  export const getByDataLEAVESETTINGS = async (date) => {
    try {
      const url = `/overtime?date=${date}`; 
      const res = await GET_API(url);
      return res?.data?.data;
    } catch (error) {
      return apiErrorHandler(error);
    }
  };
  export const delLEAVESETTINGS = async (id: string) => {
    try {
      const res = await DELETE_API(appendUrl(id));
      return res?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const editLEAVESETTINGS = async ({ id, data }: { id: string; data: any }) => {
    try {
      const res = await PUT_API(appendUrl(id), data);
      return res?.data;
    } catch (error: any) {
      return Promise.reject(apiErrorHandler(error));
    }
  };