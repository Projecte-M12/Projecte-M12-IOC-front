import { User } from "./User";

export interface Customer extends User {
  customerId: string;
  userId: string;
  name: string;
  birthday: Date;
  address?: string;
  postalCode?: string;
  city?: string;
  phone?: string;
  socialMedia?: string[];
}
