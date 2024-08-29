import { selectCurrentUser, TUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/hooks";
import { motion } from "framer-motion";
import { useGetSingleUserQuery, useUpdateUserMutation } from "../../../redux/features/auth/authApi";
import { Card, Avatar, Button, Typography, Space, Modal, Form, Input } from "antd";
import { MdEmail, MdOutlineLocationOn } from "react-icons/md";
import { BsPhone } from "react-icons/bs";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import CustomForm from "../../form/CustomForm";
import CustomInput from "../../form/CustomInput";
import { Controller, FieldValues } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

const { Title, Text } = Typography;

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
  const user = useAppSelector(selectCurrentUser);
  const email = (user as TUser)?.email;
  const [updateUser] = useUpdateUserMutation()

  const { data } = useGetSingleUserQuery(email);
  const userData = data?.data;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async(data : FieldValues) => {
    const {_id, image, ...payload} = data;
    const imageFile = { image: image };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    
    if(res?.data?.success){
        const userData = {
            ...payload, 
            image: res.data.data.display_url
        }
        const result = await updateUser({id: _id, payload: userData})
        if(result.data){
            toast.success("Profile updated successfully")
            setIsModalVisible(false);
        }else{
            toast.error("Profile update failed")
            setIsModalVisible(false);
        }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
    >
      <div className="w-full h-auto">
        <Card
          style={{ width: "100%", maxWidth: 500, margin: "auto" }}
          actions={[
            <Button type="primary" icon={<EditOutlined />} key="edit" onClick={showModal}>
              Edit Profile
            </Button>,
          ]}
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

      <Modal
        title="Edit Profile"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <CustomForm onSubmit={handleOk} defaultValues={userData} >
          <CustomInput name="name" type="text" label="Name" />
          <CustomInput name="email" type="text" label="Email" />
          <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
          <CustomInput name="password" type="text" label="Password" />
          <CustomInput name="phone" type="text" label="Phone Number" />
          <CustomInput name="address" type="text" label="Address" />
          <div className="w-full text-center">
            <Button htmlType="submit">Submit</Button>
          </div>
        </CustomForm>
      </Modal>
    </motion.div>
  );
};

export default Profile;