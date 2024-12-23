import { Button, Card, Carousel } from "antd";
import CustomButton2 from "../Buttons/CustomButton2";
import { MdOutlineDone } from "react-icons/md";
import { TService } from "../../../types/service";
import { Link } from "react-router-dom";

const ServiceCard = ({
  service,
  onSelect,
  isSelected,
  compare,
}: {
  service: TService;
  onSelect?: () => void;
  isSelected?: boolean;
  compare?: boolean;
}) => {
  return (
    <Card
      className="border-[#163196] p-0 shadow-lg"
      extra={
        compare && (
          <Button onClick={onSelect}>
            {isSelected ? "Deselect" : "Select"}
          </Button>
        )
      }
      style={{
        border: isSelected ? "2px solid #1890ff" : "1px solid #f0f0f0",
      }}
      bodyStyle={{ padding: 12 }}
    >
      <Carousel autoplay>
        {service.images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Service ${index + 1}`}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </div>
        ))}
      </Carousel>

      <div className="text-center text-[#163196] font-semibold mt-4">
        <h2 className="text-lg">{service.name}</h2>
        <p className="text-3xl my-3">${service.price}</p>
      </div>
      <div>
        <div className="flex gap-2 my-2">
          <MdOutlineDone className="bg-[#163196] mt-1 size-4 text-white rounded-sm" />
          <p className="flex-1 line-clamp-1">{service.description}</p>
        </div>
        <p className="flex gap-2">
          <MdOutlineDone className="bg-[#163196] mt-1 size-4 text-white rounded-sm" />
          Duration: {service.duration} min
        </p>
      </div>
      <div className="w-full mt-8 text-center">
        <Link to={`/services/${service._id}`}>
          <CustomButton2 text="Details" textColor="#111111" />
        </Link>
      </div>
    </Card>
  );
};

export default ServiceCard;
