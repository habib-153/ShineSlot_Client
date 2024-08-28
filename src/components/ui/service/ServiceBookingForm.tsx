import { Button } from "antd";
import { TService, TSlot } from "../../../types/service";
import CustomForm from "../../form/CustomForm";
import CustomInput from "../../form/CustomInput";
import { FieldValues } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import CustomSelect from "../../form/CustomSelect";
import { vehicleTypeOptions } from "../../../constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVehicleValidationSchema } from "../../../schema";
import { useNavigate } from "react-router-dom";
import { addBooking } from "../../../redux/features/bookings/bookingSlice";

type ServiceBookingFormProps = {
  service: TService | undefined;
  slot: TSlot | undefined;
};
const ServiceBookingForm = ({ service, slot }: ServiceBookingFormProps) => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    const bookingData = {
      serviceId: service?._id,
      slotId: slot?._id,
      vehicleType: data.vehicleType,
      vehicleBrand: data.vehicleBrand,
      vehicleModel: data.vehicleModel,
      manufacturingYear: parseInt(data.manufacturingYear),
      registrationPlate: data.registration,
    };
    dispatch(addBooking({ booking: bookingData, amount: service?.price }));
    navigate("/bookings");
  };
  return (
    <div className="max-w-[400px] mx-auto border p-5 rounded-xl mb-2">
      <h2 className="text-2xl font-semibold my-2 text-center">
        Book This Service For Your Car
      </h2>
      <CustomForm
        onSubmit={onSubmit}
        resolver={zodResolver(createVehicleValidationSchema)}
      >
        <CustomSelect
          options={vehicleTypeOptions}
          name="vehicleType"
          label="Vehicle Type"
        />
        <CustomInput name="vehicleBrand" type="text" label="Vehicle Brand" />
        <CustomInput name="vehicleModel" type="text" label="Vehicle Model" />
        <CustomInput
          name="manufacturingYear"
          type="number"
          label="Manufacturing Year"
        />
        <CustomInput
          name="registrationPlate"
          type="text"
          label="Registration Plate"
        />
        <div className="w-full text-center">
          <Button
            type="primary"
            size="large"
            // onClick={handleBookingSlots}
            htmlType="submit"
            disabled={!slot || user?.role === "admin"}
          >
            Book Slot
          </Button>
        </div>
      </CustomForm>
    </div>
  );
};

export default ServiceBookingForm;
