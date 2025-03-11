import { object, string } from "yup";


export const companySchema = object({
  profileImage: string().label("Profile Image").required(),
  companyName: string().label("Company Name").required(),
  email: string().label("Enter Your Email").required(),
  phoneNumbere1: string().label("Enter Your PhoneNumbere").required(),
  phoneNumbere2: string().label("Enter Your PhoneNumbere"),
  fax: string().label("Enter Your FaxNumbere").required(),
  website: string().label("Enter Your WebsiteURL"),
  tags: string().label("Tags").required(),
  deals: string().label("Deals").required(),
  industry: string().label("Industry").required(),
  contact: string().label("Contact").required(),
  currency: string().label("Currency").required(),
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
