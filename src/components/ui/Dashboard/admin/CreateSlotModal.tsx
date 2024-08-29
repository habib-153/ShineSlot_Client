import { useState } from "react";
import CustomButton2 from "../../Buttons/CustomButton2";
import { Button, Modal } from "antd";
import { useGetAllServicesQuery } from "../../../../redux/features/service/serviceApi";
import { TService } from "../../../../types/service";
import CustomForm from "../../../form/CustomForm";
import CustomSelect from "../../../form/CustomSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomTimePicker from "../../../form/CustomTimePicker";
import CustomDatePicker from "../../../form/CustomDatePicker";
import { createSlotValidationSchema } from "../../../../schema";
import { FieldValues } from "react-hook-form";
import { useCreateNewSlotsMutation } from "../../../../redux/features/slot/slotApi";
import { toast } from "sonner";
import moment from "moment";
import { TError } from "../../../../types/global";

const CreateSlotModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: servicesData } = useGetAllServicesQuery({ undefined });
  const [createSlot] = useCreateNewSlotsMutation();

  const serviceOptions = servicesData?.data?.map((service: TService) => ({
    value: service._id,
    label: service.name,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating slot...");

    const slotInfo = {
      service: data.service,
      date: moment(new Date(data.date)).format("YYYY-MM-DD"),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
      isBooked: "available",
    };
    const res = await createSlot(slotInfo);
    if (res.error) {
      toast.error((res?.error as TError)?.data?.message, { id: toastId });
    } else {
      toast.success("Slot created successfully", { id: toastId });
      setIsOpen(false);
    }
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="w-full text-end">
        <CustomButton2
        onClick={handleOpen}
        text="Create A Slot"
        textColor="#ffffff"
        bgColor="#111111"
      />
      </div>
      <Modal
        open={isOpen}
        //onOk={handleOk}
        onCancel={handleOk}
        footer={null}
      >
        <h2 className="text-2xl font-semibold text-center">Create A Slot</h2>
        <CustomForm
          onSubmit={onSubmit}
          resolver={zodResolver(createSlotValidationSchema)}
        >
          <CustomSelect
            label="Service"
            name="service"
            options={serviceOptions}
          />
          <CustomDatePicker name="date" label="Date" />
          <CustomTimePicker name="startTime" label="Start Time" />
          <CustomTimePicker name="endTime" label="End Time" />
          <div className="w-full text-center">
            <Button htmlType="submit">Submit</Button>
          </div>
        </CustomForm>
      </Modal>
    </div>
  );
};

export default CreateSlotModal;
