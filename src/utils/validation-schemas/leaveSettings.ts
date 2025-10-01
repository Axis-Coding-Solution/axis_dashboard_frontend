import { date, number, object, string } from "yup";

export const leaveGenaricSchema = object({
    noOfDays:number()
  .typeError("Must be a number")
  .required("Days is required")
  .positive("Must be positive")
  .integer("Must be an integer")
  });

  export const leaveStaticSchema = object({
    policyName: string().label("PolicyName Name").typeError("PolicyName Name Required").required(),
    noOfDays:number()
  .typeError("Must be a number")
  .required("Days is required")
  .positive("Must be positive")
  .integer("Must be an integer")
  });