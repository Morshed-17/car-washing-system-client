import { ApiResponse, Service } from "@/types";
import { baseApi } from "../baseApi";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query<ApiResponse<Service[]>, any>({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllServicesQuery } = serviceApi;
