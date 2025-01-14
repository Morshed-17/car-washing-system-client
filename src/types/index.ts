//* Genral type for user
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiErrorMessage {
  path: string; // Field that caused the error
  message: string; // Error message
}
export type ApiResponse<T> = {
  success: true;
  message: string;
  statusCode: number;
  data: T;
};

export type ApiError = {
  success: boolean;
  message: string;
  errorMessages?: ApiErrorMessage[];
  stack?: string;
};

// Now you can use this type for any API response
export type SignupResponse = ApiResponse<User>;
export type LoginResponse = ApiResponse<User & { token: string }>;
