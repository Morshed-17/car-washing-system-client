//* General type for api response
export interface ApiResponse<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
}
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

export type SignupSuccessResponse = ApiResponse<User>;
export interface LoginSuccessResponse extends ApiResponse<User> {
  token: string;
}

export interface ApiErrorMessage {
  path: string; // Field that caused the error
  message: string; // Error message
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errorMessages: ApiErrorMessage[];
  stack?: string; // Optional, depending on whether you want to expose stack traces
}
