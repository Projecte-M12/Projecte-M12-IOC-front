interface Reservation {
  id: string;
  customerId: string;
  companyId: string;
  date: Date;
  service: string;
  time: number; //Minutos
  numberOfGuests?: number;
  status: ReservationStatus;
  createdAt: Date;
  updatedAt: Date;
}

enum ReservationStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Rejected = "rejected",
}

export type { Reservation, ReservationStatus };
