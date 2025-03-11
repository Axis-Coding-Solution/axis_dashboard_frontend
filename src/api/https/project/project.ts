import { DELETE_API, GET_API, POST_API, PUT_API } from "../../../utils/api_helper.ts";
import { apiErrorHandler } from "../helpers.ts";


const url = "/project"

const appendUrl = (segment: string) => `${url}/${segment}`;
export const addProject = async (body: any) => {
    try {
        const res = await POST_API((url), body);
        return res.data
    } catch (error: any) {
        return apiErrorHandler(error)
    }
}

export const getAllProject = async () => {
    try {
      const res = await GET_API(url);
      return res?.data?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const getByIdProject = async (id: string) => {
    try {
      const res = await GET_API(appendUrl(id));
      return res?.data?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const delProject = async (id: string) => {
    try {
      const res = await DELETE_API(appendUrl(id));
      return res?.data;
    } catch (error: any) {
      return apiErrorHandler(error);
    }
  };

  export const editProject = async ({ id, projectName }: { id: string; projectName: any }) => {
    try {
      console.log(id,'0000000000000',projectName);
      
      const res = await PUT_API(appendUrl(id), {projectName});
      return res.data;
    } catch (error: any) {
      return Promise.reject(apiErrorHandler(error));
    }
  };