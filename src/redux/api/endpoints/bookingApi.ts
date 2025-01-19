import { ApiResponse } from "@/types";
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
  }),
});

export const { useCreateBookingMutation } = bookingApi;
