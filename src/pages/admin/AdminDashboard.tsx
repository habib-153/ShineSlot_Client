import Profile from "../../components/ui/Dashboard/Profile";
import { useGetAllUsersQuery } from "../../redux/features/auth/authApi";
import { useGetAllBookingsQuery } from "../../redux/features/bookings/bookingsApi";
import { useGetAllServicesForAdminQuery } from "../../redux/features/service/serviceApi";
import { Card, Col, Row, Statistic } from "antd";
import { subMonths } from "date-fns";
import { TBooking } from "../../types/service";

const AdminDashboard = () => {
  const { data: services } = useGetAllServicesForAdminQuery(undefined);
  const { data: bookings } = useGetAllBookingsQuery(undefined);
  const { data: users } = useGetAllUsersQuery(undefined);

  const recentBookings = bookings?.data?.filter((booking : TBooking) => {
    const bookingDate = new Date(booking.createdAt as string);
    return bookingDate >= subMonths(new Date(), 1);
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <Profile />
        </div>
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} >
          <Card>
            <Statistic
              title="Total Users"
              value={users?.data?.length || 0}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} >
          <Card>
            <Statistic
              title="Total Services"
              value={services?.data?.length || 0}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} >
          <Card>
            <Statistic
              title="Total Bookings"
              value={bookings?.data?.length || 0}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} >
          <Card>
            <Statistic
              title="Recent Bookings (Last 1 Month)"
              value={recentBookings?.length || 0}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;