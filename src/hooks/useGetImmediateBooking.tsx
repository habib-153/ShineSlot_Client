import { isAfter, parseISO } from "date-fns";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useGetMyBookingsQuery } from "../redux/features/bookings/bookingsApi";
import { useAppSelector } from "../redux/hooks";
import { TBooking } from "../types/service";


const useGetImmediateBooking = () => {
  const user = useAppSelector(selectCurrentUser)

  const { data, isLoading: isBookingLoading } = useGetMyBookingsQuery(undefined);

  const upcomingBookings = data?.filter((item: TBooking) => {
    let startTime = item.slotId.startTime;
  if (startTime.length === 4) {
    startTime = '0' + startTime; // Add leading zero if necessary
  }

  const slotDate = parseISO(item.slotId.date + "T" + startTime);
    return isAfter(slotDate, new Date());
  });

  const immediateBooking : TBooking = upcomingBookings?.[0];
  let expiryTimestamp;

  if (immediateBooking) {
    const slotDate = parseISO(immediateBooking?.slotId?.date); 

    if (slotDate && immediateBooking?.slotId?.startTime) {
        let startTime = immediateBooking.slotId.startTime;
        if (startTime.length === 4) {
          startTime = '0' + startTime;
        }
      if (startTime) {
        // Parse time using date-fns
        const [hours, minutes] = startTime.split(":").map(Number);

        // Combine date and time into a single Date object
        expiryTimestamp = new Date(slotDate);
        expiryTimestamp.setHours(hours, minutes, 0, 0);
      }
    }
  }

  // Add a nullish check for loadedUser
  // console.log(immediateBooking?.customer)
  if (user) {
    if (immediateBooking?.customer?.email !== user.email) {
        //console.log('hello')
      return {
        immediateBooking: null,
      };
    }
  }

  return { immediateBooking, expiryTimestamp, isBookingLoading };
};

export default useGetImmediateBooking;