interface Reservation {
  id: string;
  customerId: string;
  companyId: string;
  date: Date; //Hace referencia tanto a la fecha como a la hora de la reserva
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
