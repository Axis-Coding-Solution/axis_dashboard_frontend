import { date, object, ref, string } from "yup";
export const employeeSchema = object({
  firstName: string().label("First Name").required("First Name Required"),
  lastName: string().label("Last Name").required("Last Name Required"),
  userName: string().label("User Name").required("User Name Required"),
  email: string()
    .label("Email")
    .required("Email Required")
    .email("Invalid email format"),
    password: string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: string()
          .required("Confirm Password is required")
          .oneOf([ref("password")], "Passwords must match")
,
  employeeId: string().label("Employee ID").required("Employee Required"),
  joiningDate: date()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .label("Joining Date")
    .required("Joining Date is required"),
  phone: string()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .label("Phone")
    .required("Phone is required"),
  companyId: string().label("Company").required("Company is required"),
  departmentId: string()
    .label("Department")
    .required("Department is required"),
  designationId: string()
    .label("Designation")
    .required("Designation is required"),
});
export const editemployeeSchema = object({
  firstName: string().label("First Name").required("First Name Required"),
  lastName: string().label("Last Name").required("Last Name Required"),
  userName: string().label("User Name").required("User Name Required"),
  email: string()
    .label("Email")
    .required("Email Required")
    .email("Invalid email format"),
    password: string().notRequired(),
  confirmPassword: string()
  .notRequired()
,
  employeeId: string().label("Employee ID").required("Employee Required"),
  joiningDate: date()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .label("Joining Date")
    .required("Joining Date is required"),
  phone: string()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .label("Phone")
    .required("Phone is required"),
  companyId: string().label("Company").required("Company is required"),
  departmentId: string()
    .label("Department")
    .required("Department is required"),
  designationId: string()
    .label("Designation")
    .required("Designation is required"),
});
