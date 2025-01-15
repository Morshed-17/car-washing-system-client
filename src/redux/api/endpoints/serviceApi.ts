import { ApiResponse, Service } from "@/types";
import { baseApi } from "../baseApi";
import * as z from "zod";
import { AddServiceSchema } from "@/schema";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query<ApiResponse<Service[]>, any>({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    getSingleService: builder.query<
      ApiResponse<Service>,
      { serviceId: string }
    >({
      query: (payload) => ({
        url: `/services/${payload.serviceId}`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    addService: builder.mutation<
      ApiResponse<Service[]>,
      z.infer<typeof AddServiceSchema>
    >({
      query: (payload) => ({
        url: "/services",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Service"],
    }),
    updateService: builder.mutation<
      ApiResponse<Service[]>,
      {
        updatedService: z.infer<typeof AddServiceSchema>;
        serviceId: string;
      }
    >({
      query: (payload) => ({
        url: `/services/${payload.serviceId}`,
        method: "PUT",
        body: payload.updatedService,
      }),
      invalidatesTags: ["Service"],
    }),
    deleteService: builder.mutation<ApiResponse<any>, { serviceId: string }>({
      query: (payload) => ({
        url: `/services/${payload.serviceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useAddServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
  useGetSingleServiceQuery
} = serviceApi;
