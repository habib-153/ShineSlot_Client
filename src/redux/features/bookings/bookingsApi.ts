import { baseApi } from "../../../redux/api/baseApi";

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
  }),
});

export const { useAddBookingsMutation } = bookingApi;