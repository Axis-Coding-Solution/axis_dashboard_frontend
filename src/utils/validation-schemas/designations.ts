import { object, string } from "yup";

export const designationSchema = object({
    departmentName: string().label("Department Name").required().min(3),
  });
   