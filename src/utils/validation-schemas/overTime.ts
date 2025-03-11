import { date, number, object, string } from "yup";

export const overTimeSchema = object({
    employeeId: string().label("Employee ID").required(),
    overtimeHours: number().label("OverTime ").required(),
    overtimeDate: date()
    .nullable()
    .transform((value, originalValue) => originalValue === "" ? null : value)
    .label("OverTime Date")
    .required("OverTime Date is required"),
    description: string().label("Description "),
  });