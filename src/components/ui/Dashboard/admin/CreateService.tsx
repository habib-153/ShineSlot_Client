import { Button, Modal } from "antd";
import CustomButton2 from "../../Buttons/CustomButton2";
import CustomForm from "../../../form/CustomForm";
import CustomInput from "../../../form/CustomInput";
import { useState } from "react";
import { useAddServiceMutation } from "../../../../redux/features/service/serviceApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { TError } from "../../../../types/global";

const CreateService = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateService] = useAddServiceMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating service...");
    const payload = {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      duration: parseFloat(data.duration),
      isDeleted: false,
    };
    const res = await updateService(payload);
    
    if (res.error) {
      toast.error((res?.error as TError)?.data?.message, { id: toastId });
    } else {
      toast.success(res?.data?.message, { id: toastId });
      setIsOpen(false);
    }
  };
  
  return (
    <div>
      <div className="w-full text-end">
        <CustomButton2
        onClick={() => setIsOpen(true)}
        text="Create A Service"
        textColor="#ffffff"
        bgColor="#111111"
      />
      </div>
      <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null}>
        <h2 className="text-2xl font-semibold text-center">Update Service</h2>
        <CustomForm onSubmit={onSubmit}>
          <CustomInput name="name" label="Service Name" type="text" />
          <CustomInput name="description" label="Description" type="text" />
          <CustomInput name="price" label="Price" type="number" />
          <CustomInput name="duration" label="Duration" type="number" />
          <div className="w-full text-center">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </CustomForm>
      </Modal>
    </div>
  );
};

export default CreateService;
