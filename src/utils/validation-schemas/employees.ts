import { object, string } from "yup";


export const departmentSchema = object({
    departmentName: string().label("Department Name").required("Department Name Required"),
  });
   