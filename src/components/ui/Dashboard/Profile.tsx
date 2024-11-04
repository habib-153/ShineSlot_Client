/* eslint-disable @typescript-eslint/no-unused-vars */
import { selectCurrentUser, TUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/hooks";
import { motion } from "framer-motion";
import { useGetSingleUserQuery } from "../../../redux/features/auth/authApi";
import { Card, Avatar, Typography, Space } from "antd";
import { MdEmail, MdOutlineLocationOn } from "react-icons/md";
import { BsPhone } from "react-icons/bs";

const { Title, Text } = Typography;

const Profile = () => {
  const user = useAppSelector(selectCurrentUser);
  const email = (user as TUser)?.email;

  const { data } = useGetSingleUserQuery(email);
  const userData = data?.data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
    >
      <div className="w-full h-auto">
        <Card
          style={{ width: "100%", maxWidth: 500, margin: "auto" }}
        >
          <Card.Meta
            avatar={<Avatar size={100} src={userData?.image || "https://via.placeholder.com/100"} />}
            title={<Title style={{fontSize: '25px'}}>{userData?.name}</Title>}
            description={
              <Space direction="vertical" size="small">
                <Text className="flex items-center text-gray-700">
                  <MdEmail className="mr-2" />
                  {userData?.email}
                </Text>
                <Text className="flex items-center text-gray-700">
                  <MdOutlineLocationOn className="mr-2" />
                  {userData?.address}
                </Text>
                <Text className="flex items-center text-gray-700">
                  <BsPhone className="mr-2" />
                  {userData?.phone}
                </Text>
              </Space>
            }
          />
        </Card>
      </div>
    </motion.div>
  );
};

export default Profile;