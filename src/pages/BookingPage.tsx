import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useAddBookingsMutation } from "../redux/features/bookings/bookingsApi";
import { toast } from "sonner";
import { clearBooking, removeBooking } from "../redux/features/bookings/bookingSlice";
import CustomTitle from "../components/ui/customTitle/CustomTitle";
import { Button } from "antd";
import { useGetSingleServiceQuery } from "../redux/features/service/serviceApi";
import { useGetSingleSlotQuery } from "../redux/features/slot/slotApi";
import { SubmitHandler } from "react-hook-form";
import { TCheckoutForm } from "../types/global";
import CheckoutForm from "../components/ui/Booking/CheckoutForm";

const BookingPage = () => {
  const dispatch = useAppDispatch();
  const { booking } = useAppSelector((state) => state.bookings);
  
  const [addBookings] = useAddBookingsMutation();
  const serviceId = booking.map((item) => item.serviceId);
  const slotId = booking.map((item) => item.slotId);
  const { data } = useGetSingleServiceQuery(serviceId);
  const { data: slotData } = useGetSingleSlotQuery(slotId);
  const serviceData = data?.data;

  const submitHandler: SubmitHandler<TCheckoutForm> = async (data) => {
    if (booking.length === 0) {
      toast.error("Please book a slot to proceed!");
      return;
    }
    try {
      if (data.paymentMethod === "amarPay") {
        const payload = {
          ...booking[0],
          address: data?.address,
          phone: data?.phone,
          paymentStatus: 'pending'
        };
        const res = await addBookings(payload).unwrap()
        if(res.data?.payment?.result){
            window.location.href = res.data?.payment?.payment_url
        }
        dispatch(clearBooking())
      }
    } catch {
      toast.error("Something went wrong, please try again");
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeBooking(id));
    toast.success("Service Slot removed successfully!");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //   if (isLoading) {
  //     return <Loading />;
  //   }

  return (
    <div className="my-10 container mx-auto">
      <div>
        <CustomTitle title="Review Bookings" />
        <p className="text-lg mt-1 px-4 text-gray-800">
          Pay & Complete Your Booking
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-between">
        <div className="my-4">
          {booking.length === 0 ? (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 text-center">
              There is no booking available
            </div>
          ) : (
            <div className="rounded">
              <div className="flex flex-col gap-2">
                {booking.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex shadow rounded items-center px-4 py-2 justify-between border"
                  >
                    <div>
                      <h3 className="text-xl font-semibold">
                        {serviceData?.name}
                      </h3>
                      <p>
                        Vehicle: <span>{item?.vehicleType}</span>
                      </p>
                      <p>
                        Brand: <span>{item?.vehicleBrand}</span>
                      </p>
                      <p>
                        Model: <span>{item?.vehicleModel}</span>
                      </p>
                    </div>
                    <div>
                      <p className="border-[2px] px-3 py-1 rounded-lg border-blue-500">{`${slotData?.data?.startTime} - ${slotData?.data?.endTime}`}</p>
                      <p className="font-semibold text-center mt-1">$ {serviceData?.price}</p>
                    </div>
                    <div className="">
                      <Button
                        type="primary"
                        danger={true}
                        onClick={() => handleRemoveItem(item._id as string)}
                        className="bg-red-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="md:-mt-5">
          <CheckoutForm submitHandler={submitHandler} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
