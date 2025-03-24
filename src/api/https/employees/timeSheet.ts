import { DELETE_API, GET_API, POST_API, PUT_API } from "../../../utils/api_helper.ts";
import { apiErrorHandler } from "../helpers.ts";
const url = "/timesheet"

const appendUrl = (segment: string) => `${url}/${segment}`;
export const addTIMESHEET = async (body: any) => {
    try {
        const res = await POST_API((url), body);
        return res.data
    } catch (error: any) {
        return apiErrorHandler(error)
    }
}

export const getAllTIMESHEET = async (page=1 , limit=10) => {
  try {
    const res = await GET_API(`/timesheet?page=${page}&limit=${limit}`);
    return res?.data?.data;
  } catch (error: any) {
    return apiErrorHandler(error);
  }
};

  export const getByIdTIMESHEET = async (id: string) => {
    try {
      const res = await GET_API(appendUrl(id));
      return res?.data?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };
  export const getByDataTIMESHEET = async (date) => {
    try {
      console.log(date,'1111111111111111');
      const url = `/timesheet?date=${date}`; 
      const res = await GET_API(url);
      return res?.data?.data;
    } catch (error) {
      return apiErrorHandler(error);
    }
  };
  export const delTIMESHEET = async (id: string) => {
    try {
      const res = await DELETE_API(appendUrl(id));
      return res?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const editTIMESHEET = async ({ id, data }: { id: string; data: any }) => {
    try {
      const res = await PUT_API(appendUrl(id), data);
      return res?.data;
    } catch (error: any) {
      return Promise.reject(apiErrorHandler(error));
    }
  };