/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, FieldValues } from "react-hook-form";
import CustomForm from "../../form/CustomForm";
import CustomInput from "../../form/CustomInput";
import { Button, Form, Input } from "antd";
import { useAppSelector } from "../../../redux/hooks";
import { TUser } from "../../../types/global";
import { useGetSingleUserQuery, useUpdateUserMutation } from "../../../redux/features/auth/authApi";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { toast } from "sonner";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Settings = () => {
    const user = useAppSelector(selectCurrentUser);
  const email = user ? (user as unknown as TUser).email : '';
  const [updateUser] = useUpdateUserMutation()

  const { data } = useGetSingleUserQuery(email);
  const userData = data?.data;

  const handleOk = async(data : FieldValues) => {
    const {_id, image, password, ...payload} = data;
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
        }else{
            toast.error("Profile update failed")
        }
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-2xl text-center">
        Update Your profile
      </h2>
      <div className="max-w-md mx-auto">
        <CustomForm onSubmit={handleOk} defaultValues={userData}>
          <CustomInput name="name" type="text" label="Name" />
          <CustomInput name="email" type="text" label="Email" />
          <CustomInput name="phone" type="text" label="Phone Number" />
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
          <CustomInput name="address" type="text" label="Address" />
          <div className="w-full text-center">
            <Button htmlType="submit">Update</Button>
          </div>
        </CustomForm>
      </div>
    </div>
  );
};

export default Settings;
