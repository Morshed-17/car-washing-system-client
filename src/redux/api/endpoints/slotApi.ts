import { ApiResponse, Slot, SlotStatus } from "@/types";
import { baseApi } from "../baseApi";

export const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlots: builder.query<ApiResponse<Slot[]>, any>({
      query: (query) => {
        const queryParams = new URLSearchParams(query).toString();
        return { url: `/slots/availability?${queryParams}`, method: "GET" };
      },
      providesTags: ["Slot"],
    }),
    addSlot: builder.mutation<ApiResponse<Slot[]>, any>({
      query: (payload) => ({
        url: "/services/slots",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Slot"],
    }),
    updateSlotStatus: builder.mutation<
      ApiResponse<Slot[]>,
      { id: string; isBooked: SlotStatus }
    >({
      query: (payload) => ({
        url: `/services/slots/${payload.id}`,
        method: "PATCH",
        body: {
          isBooked: payload.isBooked,
        },
      }),
      invalidatesTags: ["Slot"],
    }),
  }),
});

export const {
  useGetAllSlotsQuery,
  useAddSlotMutation,
  useUpdateSlotStatusMutation,
} = slotApi;
