import { Button, Card, Col, Divider, Modal, Row, Typography } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TService } from "../../../types/service";
import { useState } from "react";

const { Title, Text } = Typography;

const ServiceComparison = ({
  selectedServices,
}: {
  selectedServices: TService[];
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCompare = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  const chartData = selectedServices.map((service: TService) => ({
    name: service.name,
    Price: service.price,
    Duration: service.duration,
  }));
  return (
    <div>
      <Button
        type="primary"
        onClick={handleCompare}
        disabled={selectedServices.length < 2}
      >
        Compare Services
      </Button>
      <Modal
        title="Compare Services"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="90%"
        style={{ maxWidth: "1000px" }}
      >
        <Row gutter={[16, 16]}>
          <Col
            xs={24}
            md={24}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BarChart
              width={Math.min(600, window.innerWidth - 100)} 
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Price" fill="#8884d8" />
              <Bar dataKey="Duration" fill="#82ca9d" />
            </BarChart>
          </Col>
          {selectedServices.map((service: TService) => (
            <Col xs={24} sm={12} md={6} key={service._id}>
              <Card
                title={<Title level={5}>{service.name}</Title>}
                bordered={false}
                style={{ marginBottom: 16 }}
              >
                <Text strong>Price:</Text>
                <Text> {service.price}</Text>
                <Divider />
                <Text strong>Duration:</Text>
                <Text> {service.duration}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Modal>
    </div>
  );
};

export default ServiceComparison;
