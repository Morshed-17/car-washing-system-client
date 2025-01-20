import { ApiResponse, TBooking } from "@/types";
import { baseApi } from "../baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<
      ApiResponse<{ result: "true" | "false"; payment_url: string }>,
      { user: string; slot: string }
    >({
      query: (payload) => ({
        url: "/bookings",
        method: "POST",
        body: payload,
      }),
    }),
    getMyBooking: builder.query<ApiResponse<TBooking[]>, any>({
      query: () => ({
        url: "/my-bookings",
        method: "GET",
      }),
    }),
    getAllBookings: builder.query<ApiResponse<TBooking[]>, any>({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateBookingMutation, useGetMyBookingQuery, useGetAllBookingsQuery } = bookingApi;
