import { DELETE_API, GET_API, POST_API, PUT_API } from "../../../utils/api_helper.ts";
import { apiErrorHandler } from "../helpers.ts";


const url = "/company"

const appendUrl = (segment: string) => `${url}/${segment}`;
export const addCompanies = async (body: any) => {
    try {
        const res = await POST_API((url), body);
        return res.data
    } catch (error: any) {
        return apiErrorHandler(error)
    }
}

export const getAllCompanies = async () => {
    try {
      const res = await GET_API(url);
      return res?.data?.data?.data; 

    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const getByIdCompany = async (id: string) => {
    try {
      const res = await GET_API(appendUrl(id));
      return res?.data?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const delCompany = async (id: string) => {
    try {
      const res = await DELETE_API(appendUrl(id));
      return res?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const editCompany = async ({ id, departmentName }: { id: string; departmentName: any }) => {
    try {
      const res = await PUT_API(appendUrl(id), {departmentName});
      return res.data;
    } catch (error: any) {
      return Promise.reject(apiErrorHandler(error));
    }
  };