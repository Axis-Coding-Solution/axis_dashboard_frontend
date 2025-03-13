import { DELETE_API, GET_API, POST_API, PUT_API } from "../../../utils/api_helper.ts";
import { apiErrorHandler } from "../helpers.ts";


const url = "/department"

const appendUrl = (segment: string) => `${url}/${segment}`;
export const addDepartment = async (body: any) => {
    try {
        const res = await POST_API((url), body);
        return res.data
    } catch (error: any) {
        return apiErrorHandler(error)
    }
}

export const getAllDepartment = async (page=1 , limit=10) => {
    try {
      const res = await GET_API(`/department?page=${page}&limit=${limit}`);
      return res?.data?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const getByIdDepartment = async (id: string) => {
    try {
      const res = await GET_API(appendUrl(id));
      return res?.data?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const delDepartment = async (id: string) => {
    try {
      const res = await DELETE_API(appendUrl(id));
      return res?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const editDepartment = async ({ id, departmentName }: { id: string; departmentName: any }) => {
    try {
      const res = await PUT_API(appendUrl(id), {departmentName});
      return res.data;
    } catch (error: any) {
      return Promise.reject(apiErrorHandler(error));
    }
  };