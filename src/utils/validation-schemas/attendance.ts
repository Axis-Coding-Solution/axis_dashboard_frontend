import { boolean, date, number, object, string } from "yup";

export const AttendanceSchema = object({
    isPunch: boolean(),
  });