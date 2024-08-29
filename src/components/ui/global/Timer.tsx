/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { Typography, Row, Col } from "antd";

const { Text } = Typography;

const Timer = ({ expiryTimestamp }: any) => {
  const { seconds, minutes, hours, days, isRunning, start } = useTimer({
    expiryTimestamp,
    onExpire: () => console.log("Timer expired"),
  });

  useEffect(() => {
    // Start the timer if it's not already running
    if (!isRunning) start();
  }, [isRunning, start]);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <div className="mt-4">
      <Text className="font-semibold block mb-2">Slot starts in:</Text>
      <Row gutter={[8, 8]} align={'middle'} justify='center'>
        <Col className="">
          <div className="bg-gray-100 p-2 rounded-lg text-center">
            <Text className="block text-lg font-bold">{formatTime(days)}</Text>
            <Text className="block text-sm">DAYS</Text>
          </div>
        </Col>
        <Col className="">
          <div className="bg-gray-100 p-2 rounded-lg text-center">
            <Text className="block text-lg font-bold">{formatTime(hours)}</Text>
            <Text className="block text-sm">HOURS</Text>
          </div>
        </Col>
        <Col className="">
          <div className="bg-gray-100 p-2 rounded-lg text-center">
            <Text className="block text-lg font-bold">{formatTime(minutes)}</Text>
            <Text className="block text-sm">MINUTES</Text>
          </div>
        </Col>
        <Col className="">
          <div className="bg-gray-100 p-2 rounded-lg text-center">
            <Text className="block text-lg font-bold">{formatTime(seconds)}</Text>
            <Text>SECONDS</Text>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Timer;