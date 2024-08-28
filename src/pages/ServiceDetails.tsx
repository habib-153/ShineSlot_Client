/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { startOfDay, format, isSameDay, isBefore } from "date-fns";
import { Card, Button, notification, DatePicker, List } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import Loading from "../components/ui/global/Loading";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { addBooking } from "../redux/features/bookings/bookingSlice";
import { useGetSingleServiceQuery } from "../redux/features/service/serviceApi";
import { useGetAllSlotsQuery } from "../redux/features/slot/slotApi";
import ServiceInfo from "../components/ui/serviceDetails/ServiceInfo";
import SlotList from "../components/ui/serviceDetails/SlotList";
import { FaCheckToSlot } from "react-icons/fa6";
import { FaTimesCircle } from "react-icons/fa";
import { TSlot } from "../types/service";

const ServiceDetails = () => {
  const { id } = useParams();
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading } = useGetSingleServiceQuery(id);
  const serviceId = data?._id;
  const currentDate = startOfDay(new Date());
  const [dateRange, setDateRange] = useState<string[]>([format(currentDate, "yyyy-MM-dd")]);
  const [selectedSlot, setSelectedSlot] = useState<TSlot[]>([]);
  const dispatch = useAppDispatch();

  const formatDate = (date: Date) => format(startOfDay(date), "yyyy-MM-dd");

  const handleDateChange = (date : any) => {
    // console.log(date)
    const formattedDate = formatDate(date.toDate());
    setDateRange((prevDates) => {
      if (prevDates.length === 1 && isSameDay(new Date(prevDates[0]), date.toDate())) {
        return [formatDate(currentDate)];
      }
      return [formatDate(currentDate), formattedDate];
    });
  };

  const removeSelectedDate = () => setDateRange([format(currentDate, "yyyy-MM-dd")]);

  const disabledDate = (date: any) =>
    isBefore(date.toDate(), currentDate) ||
    isSameDay(date.toDate(), currentDate) ||
    (dateRange.length > 1 && isSameDay(date.toDate(), new Date(dateRange[1])));
  
  const handleSlotSelection = (slot: TSlot) => {
    setSelectedSlot((prevSelected) => {
      const isAlreadySelected = prevSelected.some((selected) => selected._id === slot._id);
      return isAlreadySelected ? prevSelected.filter((selected) => selected._id !== slot._id) : [...prevSelected, slot];
    });
  };

  const isSlotSelected = (slot: TSlot) => selectedSlot.some((selected) => selected._id === slot._id);

  const queryObj = useMemo(() => ({ dateRange, serviceId }), [dateRange, serviceId]);
  const { data: serviceSlots } = useGetAllSlotsQuery(queryObj);

  const currentDateFormatted = formatDate(currentDate);
  const currentDateServiceSlots = serviceSlots?.data?.filter((serviceSlot: TSlot) => serviceSlot.date === currentDateFormatted);
  const otherDateServiceSlots = serviceSlots?.data?.filter((serviceSlot: TSlot) => serviceSlot.date !== currentDateFormatted && dateRange.includes(serviceSlot.date));

  const handleBookingSlots = () => {
    dispatch(addBooking({ slotInfo: selectedSlot, totalCost: data?.price }));
    notification.success({
      message: "Booking Successful",
      description: "The slot has been booked successfully.",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 xl:px-0">
      <Card className="my-10 h-fit">
        <ServiceInfo data={data?.data} />
        <div className="lg:col-span-2 flex flex-col items-center">
          <Button
            type="primary"
            size="large"
            onClick={handleBookingSlots}
            className="w-full mt-3"
            disabled={selectedSlot.length === 0 || user?.role === "admin"}
          >
            Book Slot
          </Button>
        </div>
      </Card>
      <SlotList title="Today's Available Slots:" slots={currentDateServiceSlots} handleSlotSelection={handleSlotSelection} isSlotSelected={isSlotSelected} user={user} />
      <Card className="my-10">
    <div className="text-center">
      <div className="flex items-center justify-center gap-1 text-2xl font-bold">
        <FaCheckToSlot className="" />
        <span>Upcoming Available Slots:</span>
      </div>
      <div className="mt-7">
        <DatePicker
          onChange={handleDateChange}
          disabledDate={disabledDate}
          className="w-full"
        />
        {dateRange.length > 1 && (
          <div className="mt-5 text-xl font-semibold text-center">
            <div className="flex items-center justify-center">
              <h1>Selected Date: {dateRange[1]}</h1>
              <Button
                type="link"
                onClick={removeSelectedDate}
                className="ml-2 text-primary text-xl"
              >
                <FaTimesCircle />
              </Button>
            </div>
          </div>
        )}
      </div>
      <List className="mt-4"
        grid={{ gutter: 12 }}
        dataSource={otherDateServiceSlots}
        renderItem={(singleSlot: TSlot) => (
          <List.Item>
            <Button
              type={isSlotSelected(singleSlot) ? "primary" : "default"}
              onClick={() => handleSlotSelection(singleSlot)}
              disabled={singleSlot?.isBooked !== "available" || user?.role === "admin"}
            >
              {`${singleSlot?.startTime}-${singleSlot?.endTime}`}
            </Button>
          </List.Item>
        )}
      />
    </div>
  </Card>
    </div>
  );
};

export default ServiceDetails;