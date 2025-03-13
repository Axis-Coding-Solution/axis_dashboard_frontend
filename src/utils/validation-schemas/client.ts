import { object, ref, string } from "yup";
export const clientSchema = object({
    firstName: string().label("First Name").required("First Name Required"),
    lastName: string().label("Last Name").required("Last Name Required"),
    userName: string().label("User Name").required("User Name Required"),
    email: string()
        .label("Email")
        .required("Email Required")
        .email("Invalid email format"),
    password: string().required('Password is required').min(8, 'Password must be at least 8 characters')
    ,
    confirmPassword: string()
        .required("Confirm Password is required")
        .oneOf([ref("password")], "Passwords must match")
    ,
    phone: string()
        .nullable()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )
        .label("Phone")
        .required("Phone is required"),
    companyName: string().label("Company").required("CompanyName is required"),
});
export const editclientSchema = object({
    firstName: string().label("First Name").required("First Name Required"),
    lastName: string().label("Last Name").required("Last Name Required"),
    userName: string().label("User Name").required("User Name Required"),
    email: string()
        .label("Email")
        .required("Email Required")
        .email("Invalid email format"),
    password: string().notRequired()
    ,
    confirmPassword: string().notRequired(),
    phone: string()
        .nullable()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )
        .label("Phone")
        .required("Phone is required"),
    companyName: string().label("Company").required("CompanyName is required"),
});