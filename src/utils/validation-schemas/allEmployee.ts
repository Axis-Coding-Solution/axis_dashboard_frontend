import { date, number, object, string } from "yup";

export const employeeSchema = object({
    firstName: string().label("First Name").required(),
    lastName: string().label("Last Name").required(),
    userName: string().label("User Name").required(),
    email: string().label("Email").required().email(),
    password: string().label("Password").required(),
    confirmPassword: string().label("Confirm Password").required(),
    employeeId: string().label("Employee ID").required(),
    joiningDate: date()
      .nullable()
      .transform((value, originalValue) => originalValue === "" ? null : value)
      .label("Joining Date")
      .required("Joining Date is required"),
    phone: string()
      .nullable()
      .transform((value, originalValue) => originalValue === "" ? null : value)
      .label("Phone")
      .required("Phone is required"),
    companyId: string().label("Company").required(),
    departmentId: string().label("Department").required(),
    designationId: string().label("Designation").required()
  });