import { date, number, object, string } from "yup";


export const projectSchema = object({
    projectName: string().label("Project Name").required(),
    projectType: string().label("Project Type"),
    clientId: string().label("Select Your Client").required(),
    startDate: date().label("Enter Your StartDate").required(),
    endDate: date().label("Enter Your EndDate").required(),
    rate: number().label("Enter Your Rate").required(),
    currency: string().label("Currency"),
    rateType: string().label("RateType").required(),
    priority: string().label("Priority").required(),
    projectLeader: string().label("Add ProjectLeader").required(),
  contact: string().label("Contact").required(),
  language: string().label("Language").required(),
  aboutCompany: string().label("Note About Company").required(),
  primaryAddress: string().label("Enter PrimaryAddress").required(),
  secondaryAddress: string().label("Enter SecondaryAddress"),
  city: string().label("Enter City"),
  state: string().label("Enter State"),
  country: string().label("Enter Country"),
  zipCode: string().label("Enter ZipCode"),
  facebook: string().label("Enter Facebook"),
  twitter: string().label("Enter Twitter"),
  linkedin: string().label("Enter Linkedin"),
  instagram: string().label("Enter Instagram"),
  youtube: string().label("Enter Youtube"),

});
