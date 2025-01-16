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
  service: Service ;
  date: string; // ISO format date string (e.g., "2024-06-15")
  startTime: string; // Time in "HH:mm" format
  endTime: string; // Time in "HH:mm" format
  isBooked: "available" | "booked" | "cancelled"; // Possible states for booking
  createdAt: string; // ISO format date-time string
  updatedAt: string; // ISO format date-time string
  __v: number;
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

export type ApiError = {
  success: boolean;
  message: string;
  errorMessages?: ApiErrorMessage[];
  stack?: string;
};

export type SlotStatus =  "cancelled" | "available" | "booked"
// Now you can use this type for any API response
export type SignupResponse = ApiResponse<User>;
export type LoginResponse = ApiResponse<User & { token: string }>;


// types.ts
export type TitleSize = 'small' | 'default' | 'large';
export type TitleAlignment = 'center' | 'left';

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: TitleAlignment;
  className?: string;
  highlightWords?: string[];
  size?: TitleSize;
}