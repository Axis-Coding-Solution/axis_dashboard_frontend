import { AUTH_POST_API } from "../../../utils/api_helper.ts";
import { apiErrorHandler } from "../helpers.ts";

const url = "/auth"
const appendUrl = (segment: string) => `${url}/${segment}`


export const loginUserApi = async (body: LoginRequest) => {
    try {
        const res = await AUTH_POST_API(appendUrl('login'), body);
        return res.data
    } catch (error: any) {
        return apiErrorHandler(error)
    }
}

export interface LoginRequest {
    email: '',
    password: ''
}