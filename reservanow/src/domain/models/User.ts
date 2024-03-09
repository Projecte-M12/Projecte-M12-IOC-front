interface User {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
}

enum UserRole {
  Customer = "customer",
  Company = "company",
}

export type {User, UserRole}