import { DELETE_API, GET_API, POST_API, PUT_API } from "../../../utils/api_helper.ts";
import { apiErrorHandler } from "../helpers.ts";
const url = "/attendance"

const appendUrl = (segment: string) => `${url}/${segment}`;
export const addATTENDANCE_EMPLOYEE = async (body: any) => {
    try {
        const res = await POST_API((url), body);
        return res.data
    } catch (error: any) {
        return apiErrorHandler(error)
    }
}

export const getAllATTENDANCE_EMPLOYEE = async (page=1 , limit=10) => {
  try {
    const res = await GET_API(`/attendance?page=${page}&limit=${limit}`);
    return res?.data?.data;
  } catch (error: any) {
    return apiErrorHandler(error);
  }
};
export const getAllStats_EMPLOYEE = async () => {
    try {
      const res = await GET_API(`/attendance/statistics`);
      return res?.data?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };
  export const getAllStats_ADMIN = async () => {
    try {
      const res = await GET_API(`/attendance/admin`);
      return res?.data?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };
  export const getByIdATTENDANCE_EMPLOYEE = async (id: string) => {
    try {
      const res = await GET_API(appendUrl(id));
      return res?.data?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };
  export const getByDataATTENDANCE_EMPLOYEE = async (date) => {
    try {
      const url = `/timesheet?date=${date}`; 
      const res = await GET_API(url);
      return res?.data?.data;
    } catch (error) {
      return apiErrorHandler(error);
    }
  };
  export const delATTENDANCE_EMPLOYEE = async (id: string) => {
    try {
      const res = await DELETE_API(appendUrl(id));
      return res?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const editATTENDANCE_EMPLOYEE = async ({  punchId , data }: {  punchId : string; data: any }) => {
    try {
        
      const res = await PUT_API(appendUrl( punchId ), data);
      return res?.data;
    } catch (error: any) {
      return Promise.reject(apiErrorHandler(error));
    }
  };

  export const getByIdATTENDANCE_EMPLOYEES = async (id: string) => {
    try {
      const res = await GET_API(appendUrl(id));
      return res?.data?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };