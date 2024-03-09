import { User } from "./User";

export interface Company extends User {
  companyName: string;
  companyAddress: string;
  phone?: string;
  web?: string;
  socialMedia?: string[];
  province?: string;
  postalCode?: string;
  city?: string;
  servicesOffered: string[];
}
