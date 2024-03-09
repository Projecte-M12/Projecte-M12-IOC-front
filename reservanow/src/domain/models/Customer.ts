import { Reservation } from "./Reservation";
import { User } from "./User";

export interface Customer extends User {
  customerName: string;
  customerAddress: string;
  phoneNumber: string;
  reservations: Reservation[];
}
