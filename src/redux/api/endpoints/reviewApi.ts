import { ApiResponse, Review } from "@/types";
import { baseApi } from "../baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query<ApiResponse<Review[]>, any>({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
    addReview: builder.mutation<ApiResponse<Review[]>, Partial<Review>>({
      query: (payload) => ({
        url: "/reviews",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const { useAddReviewMutation, useGetAllReviewsQuery } = reviewApi;
