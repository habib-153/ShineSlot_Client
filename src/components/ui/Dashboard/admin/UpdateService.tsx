/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Modal } from "antd";
import { TService } from "../../../../types/service";
import { useState } from "react";
import CustomForm from "../../../form/CustomForm";
import CustomInput from "../../../form/CustomInput";
import { FieldValues } from "react-hook-form";
import { useUpdateServiceMutation } from "../../../../redux/features/service/serviceApi";
import { toast } from "sonner";
import { TError } from "../../../../types/global";

const UpdateService = ({ item }: { item: TService }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateService] = useUpdateServiceMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating...");
    const payload = {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      duration: parseFloat(data.duration),
    };
    const res = await updateService({payload: payload, id: data._id});
    
    if (res.error) {
      toast.error((res?.error as TError)?.data?.message, { id: toastId });
    } else {
      toast.success(res?.data?.message, { id: toastId });
      setIsOpen(false);
    }
  };
  
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Update</Button>
      <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null}>
        <h2 className="text-2xl font-semibold text-center">Update Service</h2>
        <CustomForm onSubmit={onSubmit} defaultValues={item}>
          <CustomInput name="name" label="Service Name" type="text" />
          <CustomInput name="description" label="Description" type="text" />
          <CustomInput name="price" label="Price" type="number" />
          <CustomInput name="duration" label="Duration" type="number" />
          <div className="w-full text-center">
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </div>
        </CustomForm>
      </Modal>
    </div>
  );
};

export default UpdateService;
