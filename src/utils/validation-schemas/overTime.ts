import { date, number, object, string } from "yup";

export const overTimeSchema = object({
    employeeId: string().label("Employee ID").required("Employee is Required"),
    overtimeHours: 
    number()
    .transform((value, originalValue) => {
      if (typeof originalValue === "string" && originalValue.trim() === "") {
        return undefined;
      }
      return value;
    })
    .typeError("Overtime Hours must be a number")
    .required("Please enter overtime hours"),
    overtimeDate: date()
    .nullable()
    .transform((value, originalValue) => originalValue === "" ? null : value)
    .label("OverTime Date")
    .required("OverTime Date is required"),
    description: string().label("Description ").required("Description is Required "),
  });