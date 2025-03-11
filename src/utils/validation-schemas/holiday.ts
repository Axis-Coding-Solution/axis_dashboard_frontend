import {date, object, string } from "yup";


export const holidaySchema = object({
    holidayName: string().label("HolidayName Name").required(),
    holidayDate: date()
          .nullable()
          .transform((value, originalValue) => originalValue === "" ? null : value)
          .label("Holiday Date")
          .required("Holiday Date is required"),
  });
   