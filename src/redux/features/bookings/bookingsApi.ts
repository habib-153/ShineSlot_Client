import { baseApi } from "../../../redux/api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBookings: builder.mutation({
      query: (bookingInfo) => {
        return {
          url: "/bookings",
          method: "POST",
          body: bookingInfo,
        };
      },
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const { useAddBookingsMutation } = bookingApi;