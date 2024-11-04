/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Row, Col, Statistic, Table } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  //PieChart, Pie, Cell
} from "recharts";
import { motion } from "framer-motion";
import Profile from "../../components/ui/Dashboard/Profile";
import { useGetUserStatsQuery } from "../../redux/features/auth/authApi";
import moment from "moment";

const UserDashboard = () => {
  const { data } = useGetUserStatsQuery(undefined);
  const stats = (
    data as {
      data: {
        monthlyStats: Record<string, { spend: number; bookings: number }>;
        totalSpend: number;
        totalBookings: number;
        totalServicesAvailed: number;
        averageSpendPerBooking: number;
        mostRecentBooking: any;
      };
    }
  )?.data;

  // Prepare monthly stats data for bar chart
  const monthlyData = stats?.monthlyStats
    ? Object.entries(stats.monthlyStats).map(([month, data]) => ({
        name: moment(month, "YYYY-M").format("MMM YYYY"),
        spend: data.spend,
        bookings: data.bookings,
      }))
    : [];

  // Recent booking columns
  const columns = [
    { title: "Service ID", dataIndex: "serviceId", key: "serviceId" },
    {
      title: "Vehicle",
      dataIndex: "vehicleBrand",
      key: "vehicleBrand",
      render: (text: string, record: any) =>
        `${text} ${record.vehicleModel} (${record.vehicleType})`,
    },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => moment(text).format("DD MMM YYYY"),
    },
    { title: "Status", dataIndex: "paymentStatus", key: "paymentStatus" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Profile />
        <Row gutter={[16, 16]}>
          {/* Stats Cards */}
          <Col xs={24} sm={12}>
            <Card>
              <Statistic
                title="Total Spend"
                value={stats?.totalSpend || 0}
                prefix="$"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card>
              <Statistic
                title="Total Bookings"
                value={stats?.totalBookings || 0}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card>
              <Statistic
                title="Services Availed"
                value={stats?.totalServicesAvailed || 0}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card>
              <Statistic
                title="Avg. Spend per Booking"
                value={stats?.averageSpendPerBooking || 0}
                prefix="$"
              />
            </Card>
          </Col>
        </Row>
      </div>
      {/* Charts */}
      <Col className="my-5" xs={24} lg={24}>
        <Card title="Monthly Statistics">
          <div style={{ width: "100%", height: "400px" }}>
            {" "}
            {/* Fixed height container */}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="spend"
                  fill="#8884d8"
                  name="Spend ($)"
                />
                <Bar
                  yAxisId="right"
                  dataKey="bookings"
                  fill="#82ca9d"
                  name="Bookings"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </Col>

      {/* Recent Booking */}
      <Col xs={24}>
        <Card title="Most Recent Booking">
          <Table
            columns={columns}
            dataSource={
              stats?.mostRecentBooking ? [stats.mostRecentBooking] : []
            }
            pagination={false}
          />
        </Card>
      </Col>
    </motion.div>
  );
};

export default UserDashboard;
