import { format, isAfter, parse, parseISO } from "date-fns";
import { useGetMyBookingsQuery } from "../../redux/features/bookings/bookingsApi";
import { TBooking } from "../../types/service";
import { motion } from "framer-motion";
import Timer from "../../components/ui/global/Timer";
import { Card, Col, Row, Typography } from "antd";

const { Title, Text } = Typography;

const UpcomingBookings = () => {
    const { data: myBookings } = useGetMyBookingsQuery(undefined);

  const upcomingBookings = myBookings?.filter((item: TBooking) => {
    let startTime = item.slotId.startTime;
  if (startTime.length === 4) {
    startTime = '0' + startTime; // Add leading zero if necessary
  }

  const slotDate = parseISO(item.slotId.date + "T" + startTime);
    return isAfter(slotDate, new Date());
  });

  const convertTo12HourFormat = (time24: string): string => {
    // Parse the 24-hour time string into a Date object
    const date = parse(time24, "HH:mm", new Date());

    // Format the Date object into a 12-hour time string with AM/PM
    return format(date, "hh:mm a");
  };
    return (
        <div className="">
      {upcomingBookings?.length > 0 ? (
        <Row gutter={[16, 16]} className="">
          {upcomingBookings?.map((booking: TBooking, index: number) => {
            const slotDate = parseISO(booking?.slotId?.date); // Ensure slot date is in ISO format

            const startTime = booking?.slotId?.startTime; 

            const [hours, minutes] = startTime.split(":").map(Number);

            // Combine date and time into a single Date object
            const expiryTimestamp = new Date(slotDate);
            expiryTimestamp.setHours(hours, minutes, 0, 0);

            return (
              <Col xs={24} sm={12} lg={8} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: index * 0.2,
                  }}
                >
                  <Card className="shadow-md rounded-lg" hoverable>
                    <Title level={4}>{booking?.serviceId?.name}</Title>
                    <Text className="block mb-2 text-gray-700">
                      {booking?.serviceId?.description}
                    </Text>
                    <Text className="block text-gray-500">
                      Date: {booking?.slotId?.date}
                    </Text>
                    <Text className="block text-gray-500">
                      Time: {convertTo12HourFormat(booking?.slotId?.startTime)} -{" "}
                      {convertTo12HourFormat(booking?.slotId?.endTime)}
                    </Text>
                    <Timer expiryTimestamp={expiryTimestamp} />
                  </Card>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      ) : (
        <p>You have no upcoming booking</p>
      )}
    </div>
    )
};

export default UpcomingBookings;