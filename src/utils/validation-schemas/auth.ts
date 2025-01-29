import { object, string } from "yup";


export const loginSchema = object({
    email: string().label("Email").required().email(),
    password: string().label("Password").required(),
  });
  