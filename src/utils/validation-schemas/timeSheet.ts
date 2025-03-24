import { date, number, object, string } from "yup";

export const timeSheetSchema = object({
  projectId: string().label("Employee ID").required("Employee is Required"),
  date: date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .label("OverTime Date")
    .required("OverTime Date is required"),
  hours: number()
    .transform((value, originalValue) =>
      originalValue === "" || isNaN(originalValue) ? null : Number(originalValue)
    )
    .typeError("Hours must be a number")
    .required("Hours is Required"),
  description: string()
    .label("Description")
    .required("Description is Required"),
});
