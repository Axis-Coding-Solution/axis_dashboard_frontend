import {array, date, number, object, string } from "yup";

export const projectSchema = object().shape({
  projectName: string().required("Project Name is required"),
  clientId: string().required("Client is required"),
  rate: string().required("Rate is required"),
  rateType: string().required("Rate Type is required"),
  priority: string().required("Priority is required"),
  projectLeader: string().required("Project Leader is required"),
  teamMembers: array().of(string()).min(1, "At least one team member is required"),
  startDate: date().typeError("Enter Your StartDate must be a valid date").required("Start Date is required"),
  endDate: date().typeError("Enter Your EndDate must be a valid date").required("End Date is required"),
  description: string().required("Description is required"),
});