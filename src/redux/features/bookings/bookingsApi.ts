/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../../redux/api/baseApi";
import { TResponseRedux } from "../../../types/global";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBookings: builder.mutation({
      query: (payload) => {
        
        return {
          url: "/bookings",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Booking"],
    }),
    getAllBookings: builder.query({
      query: () => {

        return {
          url: "/bookings",
          method: "GET",
          //params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          //meta: response.data.meta,
        };
      },
      providesTags: ["Booking"],
    }),
    getMyBookings: builder.query({
      query: () => {
        return {
          url: "/my-bookings",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => response.data,
      providesTags: ["Booking"],
    }),
  }),
});

export const { useAddBookingsMutation, useGetAllBookingsQuery, useGetMyBookingsQuery } = bookingApi;