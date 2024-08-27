import { Card } from "antd";
import CustomButton2 from "../Buttons/CustomButton2";
import { MdOutlineDone } from "react-icons/md";
import { TService } from "../../../types/service";

const ServiceCard = ({ service } : {service: TService}) => {
  return (
    <>
      <Card className="border-[#163196] shadow-lg">
        <div className="text-center text-[#163196] font-semibold">
          <h2 className=" text-lg">{service.name}</h2>
          <p className="text-3xl my-3">${service.price}</p>
        </div>
        <div>
          <p className="flex gap-2">
            <MdOutlineDone className="bg-[#163196] mt-1 text-white rounded-sm" />
            {service.description}
          </p>
          <p className="flex gap-2">
            <MdOutlineDone className="bg-[#163196] mt-1 text-white rounded-sm" />
            Duration: {service.duration} min
          </p>
        </div>
        <div className="w-full mt-8 text-center">
          <CustomButton2 text="Details" textColor="#111111" />
        </div>
      </Card>
    </>
  );
};

export default ServiceCard;
