import { TResponseRedux } from "../../../types/global";
import { TSlot } from "../../../types/service";
import { baseApi } from "../../api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlots: builder.query({
      query: ({ dateRange, serviceId }) => {

        const params = new URLSearchParams();

        if (dateRange && dateRange.length > 0) {
          const date = dateRange.join(",");
          params.append("date", date);
        }

        if (serviceId) params.append("serviceId", serviceId);

        return {
          url: `/slots/availability?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TSlot[]>) => {
        return {
          data: response.data,
          
        };
      },
      providesTags: ["Slot"],
    }),
    addNewSlots: builder.mutation({
      query: (slotInfo) => {
        return {
          url: "/services/slots",
          method: "POST",
          body: slotInfo,
        };
      },
      invalidatesTags: ["Slot"],
    }),
    getSingleSlot: builder.query({
      query: (id) => {
        return {
          url: `/slots/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Slot"],
    }),
    updateSlotStatus: builder.mutation({
      query: (options) => {
        return {
          url: `/slots/${options.id}`,
          method: "PATCH",
          body: options.data,
        };
      },
      invalidatesTags: ["Slot"],
    }),
  }),
});

export const {
  useGetAllSlotsQuery,
  useAddNewSlotsMutation,
  useUpdateSlotStatusMutation,
  useGetSingleSlotQuery,
} = slotApi;