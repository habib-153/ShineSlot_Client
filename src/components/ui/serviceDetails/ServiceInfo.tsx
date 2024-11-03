import { Carousel } from "antd";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { LuClock } from "react-icons/lu";
import { TService } from "../../../types/service";

const ServiceInfo = ({ data }: { data: TService }) => {
  return (
    <div>
      <Carousel autoplay>
        {data?.images?.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Service ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        ))}
      </Carousel>
      <h1 className="text-3xl font-bold mt-5 mb-2">{data?.name}</h1>
      <p className="mt-2 text-lg text-gray-800">{data?.description}</p>
      <p className="text-xl font-medium mt-3 flex items-center gap-1">
        <RiMoneyDollarCircleLine />
        <span>Service Cost: ${data?.price}.00</span>
      </p>
      <p className="text-xl font-medium mt-3 flex items-center gap-1">
        <LuClock />
        <span>Service Duration: {data?.duration} minutes</span>
      </p>
    </div>
  );
};

export default ServiceInfo;