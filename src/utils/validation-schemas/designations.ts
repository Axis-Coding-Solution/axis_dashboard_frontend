import { object, string } from "yup";

export const designationSchema = object({
  designationName: string().label("Designation Name").required().min(3),
  departmentName: string().label("Department Name")
    .required("Department Name is required")
    .transform((value) => (value === "" ? undefined : value)),
});
