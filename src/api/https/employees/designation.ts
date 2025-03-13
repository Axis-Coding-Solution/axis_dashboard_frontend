  import { DELETE_API, GET_API, POST_API, PUT_API } from "../../../utils/api_helper.ts";
  import { apiErrorHandler } from "../helpers.ts";
  
  
  const url = `/designation`
  
  const appendUrl = (segment: string) => `${url}/${segment}`;
  export const addDesignation = async (body: any) => {
      try {
        console.log('8888888',body);
        
          const res = await POST_API((url), body);
          return res.data
      } catch (error: any) {
          return apiErrorHandler(error)
      }
  }
  
  export const getAllDesignation = async (page=1 , limit=10) => {
      try {
        const res = await GET_API(`/designation?page=${page}&limit=${limit}`);
        return res?.data?.data;
      } catch (error: any) {
        return apiErrorHandler(error);
      }
    };
  
    export const getByIdDesignation = async (id: string) => {
      try {
        const res = await GET_API(appendUrl(id));
        return res?.data?.data;
      } catch (error: any) {
        return apiErrorHandler(error);
      }
    };
  
    export const delDesignation = async (id: string) => {
      try {
        const res = await DELETE_API(appendUrl(id));
        return res?.data;
      } catch (error: any) {
        return apiErrorHandler(error);
      }
    };
  
    export const editDesignation = async ({ id, designationName,departmentId }: { id: string; designationName: any,departmentId:string }) => {
      try {
        
        const res = await PUT_API(appendUrl(id), {designationName,departmentId});
        return res.data;
      } catch (error: any) {
        return Promise.reject(apiErrorHandler(error));
      }
    };