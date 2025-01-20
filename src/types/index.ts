//* Genral type for user
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user";
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

//*Service
export interface Service {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

//*
export type Slot = {
  _id: string;
  service: Service;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "cancelled";
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TBooking = {
  user: User;
  slot: Slot;
  paymentStatus: "Pending" | "Paid" | "Failed";
  transactionId: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
};

// review
export type Review = {
  _id: string;
  rating: number;
  feedback: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

export interface ApiErrorMessage {
  path: string; // Field that caused the error
  message: string; // Error message
}
export type ApiResponse<T> = {
  success: true;
  message: string;
  statusCode: number;
  data: T;
  token?: string;
};
export type ApiResponseWithMeta<T> = {
  success: true;
  message: string;
  statusCode: number;
  data: {
    data: T;
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
  };
  token?: string;
};

export type ApiError = {
  success: boolean;
  message: string;
  errorMessages?: ApiErrorMessage[];
  stack?: string;
};

export type SlotStatus = "cancelled" | "available" | "booked";
// Now you can use this type for any API response
export type SignupResponse = ApiResponse<User>;
export type LoginResponse = ApiResponse<User & { token: string }>;

// types.ts
export type TitleSize = "small" | "default" | "large";
export type TitleAlignment = "center" | "left";

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: TitleAlignment;
  className?: string;
  highlightWords?: string[];
  size?: TitleSize;
}
