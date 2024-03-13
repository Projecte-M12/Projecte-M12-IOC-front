import { User } from "./User";

export interface Company extends User {
  companyId: string;
  userId: string;
  companyName: string;
  companyAddress: string;
  phone?: string;
  web?: string;
  socialMedia?: string[];
  postalCode: string;
  city: string;
  reservationFractionTime: number; //En minutos
  servicesOffered: string[];
}
