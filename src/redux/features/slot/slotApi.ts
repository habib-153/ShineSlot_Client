import { TQueryParams, TResponseRedux } from "../../../types/global";
import { TSlot } from "../../../types/service";
import { baseApi } from "../../api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlots: builder.query({
      query: ({ dateRange, serviceId }) => {
        const params = new URLSearchParams();

        if (dateRange && dateRange.length > 0) {
          const date = dateRange.join(",");
          params.append("searchDate", date);
        }
        if (serviceId) params.append("serviceId", serviceId);

        return {
          url: `/slots/availability`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TSlot[]>) => {
        return {
          data: response.data,
          
        };
      },
      providesTags: ["Slot"],
    }),
    getAllSlotsForAdmin: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/slots/availability`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TSlot[]>) => {
        return {
          data: response.data, 
        };
      },
      providesTags: ["Slot"],
    }),
    createNewSlots: builder.mutation({
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
      query: (payload) => {
        return {
          url: `/slots/${payload.id}`,
          method: "PUT",
          body: payload.data,
        };
      },
      invalidatesTags: ["Slot"],
    }),
  }),
});

export const {
  useGetAllSlotsQuery,
  useCreateNewSlotsMutation,
  useUpdateSlotStatusMutation,
  useGetSingleSlotQuery,
  useGetAllSlotsForAdminQuery,
} = slotApi;